---
id: unit_test
title: Unit testing and quality control
---

We expect every contributor to make good tests for each contribution. Easiest is to look att the current tests in the project you are contributing in and try to maintain the current style.

PR:s that decrease test coverage in any significant way will not be accepted.

We do code coverage analysis as part of the PR process so it should be quite easy to see if your tests cover.

As part of PR build process we also check for warnings. Each warning found is treated as error. This will help maintain code quality over time.
