---
name: gringo-calc-regression-testing
description: Review and regression-test Gringo Calc after JavaScript, HTML, CSS, currency parsing, formatting, calculation, persistence, or number-wording changes. Use before accepting a feature or preparing a release.
---

# Gringo Calc Regression Testing

1. Read `PROJECT_STATE.md`.
2. Review the Git diff before testing.
3. Identify every affected behavior.
4. Test each calculator authority path:
   - CRC edited
   - USD edited
   - Exchange Rate edited
5. Test focus-aware number wording.
6. Test empty, zero, invalid, singular, plural, and decimal values.
7. Test CRC focus, input, blur, and formatting.
8. Test debounce behavior.
9. Test localStorage by reloading the application.
10. Test Clear.
11. Check the browser console.
12. Report:
    - passed checks
    - failed checks
    - regressions
    - untested risks
    - recommended fixes

Never state that all tests pass unless each listed check was actually performed
or supported by automated test output.