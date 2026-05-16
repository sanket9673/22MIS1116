# Logging Middleware

This folder contains the reusable logging middleware
used across the notification system.

The middleware follows the required signature:

Log(stack, level, package, message)

The middleware was integrated from the first
function written as required in the assessment.

During development, the logger was temporarily
stubbed to avoid evaluation API latency issues.
