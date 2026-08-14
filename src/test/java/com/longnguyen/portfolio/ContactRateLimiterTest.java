package com.longnguyen.portfolio;

import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class ContactRateLimiterTest {
    private static final Clock FIXED_CLOCK = Clock.fixed(Instant.parse("2026-08-14T20:00:00Z"), ZoneOffset.UTC);

    @Test
    void permitsFiveRequestsAndRejectsTheSixthForOneClient() {
        ContactRateLimiter rateLimiter = new ContactRateLimiter(FIXED_CLOCK);

        for (int attempt = 0; attempt < ContactRateLimiter.MAX_ATTEMPTS; attempt += 1) {
            assertThat(rateLimiter.tryAcquire("203.0.113.10")).isTrue();
        }

        assertThat(rateLimiter.tryAcquire("203.0.113.10")).isFalse();
        assertThat(rateLimiter.tryAcquire("203.0.113.11")).isTrue();
    }

    @Test
    void startsANewWindowAfterTheLimitExpires() {
        MutableClock clock = new MutableClock(Instant.parse("2026-08-14T20:00:00Z"));
        ContactRateLimiter rateLimiter = new ContactRateLimiter(clock);

        for (int attempt = 0; attempt < ContactRateLimiter.MAX_ATTEMPTS; attempt += 1) {
            rateLimiter.tryAcquire("203.0.113.10");
        }

        clock.advance(ContactRateLimiter.WINDOW_DURATION);

        assertThat(rateLimiter.tryAcquire("203.0.113.10")).isTrue();
    }

    private static final class MutableClock extends Clock {
        private Instant currentInstant;

        private MutableClock(Instant currentInstant) {
            this.currentInstant = currentInstant;
        }

        private void advance(Duration duration) {
            currentInstant = currentInstant.plus(duration);
        }

        @Override
        public ZoneId getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return Clock.fixed(currentInstant, zone);
        }

        @Override
        public Instant instant() {
            return currentInstant;
        }
    }
}
