package com.longnguyen.portfolio;

import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ContactRateLimiter {
    static final int MAX_ATTEMPTS = 5;
    static final Duration WINDOW_DURATION = Duration.ofMinutes(10);

    private static final int CLEANUP_THRESHOLD = 1000;
    private static final Duration CLEANUP_INTERVAL = Duration.ofMinutes(1);

    private final Clock clock;
    private final ConcurrentHashMap<String, AttemptWindow> attemptsByClient = new ConcurrentHashMap<>();
    private final AtomicLong lastCleanupAt = new AtomicLong();

    public ContactRateLimiter() {
        this(Clock.systemUTC());
    }

    ContactRateLimiter(Clock clock) {
        this.clock = clock;
    }

    public boolean tryAcquire(String clientAddress) {
        long now = clock.millis();
        String clientKey = clientAddress == null || clientAddress.isBlank() ? "unknown" : clientAddress;
        AtomicBoolean allowed = new AtomicBoolean(false);

        attemptsByClient.compute(clientKey, (key, currentWindow) -> {
            if (currentWindow == null || currentWindow.isExpired(now)) {
                allowed.set(true);
                return new AttemptWindow(now, 1);
            }

            if (currentWindow.attempts() >= MAX_ATTEMPTS) {
                return currentWindow;
            }

            allowed.set(true);
            return new AttemptWindow(currentWindow.startedAt(), currentWindow.attempts() + 1);
        });

        long previousCleanup = lastCleanupAt.get();
        if (attemptsByClient.size() > CLEANUP_THRESHOLD
                && now - previousCleanup >= CLEANUP_INTERVAL.toMillis()
                && lastCleanupAt.compareAndSet(previousCleanup, now)) {
            attemptsByClient.entrySet().removeIf(entry -> entry.getValue().isExpired(now));
        }

        return allowed.get();
    }

    private record AttemptWindow(long startedAt, int attempts) {
        private boolean isExpired(long now) {
            return now - startedAt >= WINDOW_DURATION.toMillis();
        }
    }
}
