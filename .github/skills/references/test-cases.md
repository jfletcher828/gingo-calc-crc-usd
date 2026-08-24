# Gringo Calc Regression Cases

## USD focus

- 100 USD produces One hundred dollars.
- 50.23 USD produces Fifty dollars and twenty-three cents.
- 1.01 USD produces One dollar and one cent.

## Exchange-rate focus

- 443 produces Four hundred forty-three colones per dollar.
- A decimal rate preserves the calculator's configured precision.

## CRC focus

- 1.500.000 produces One million five hundred thousand colones.
- A CRC decimal retains Costa Rican input and display conventions.

## Calculator behavior

- Editing CRC recalculates USD.
- Editing USD recalculates CRC.
- Editing Rate recalculates the appropriate dependent value.
- Debounce does not require clearing a field.
- Blur does not produce NaN.
- Reload restores stored values.
- Clear restores the expected default state.
- Browser console contains no errors.