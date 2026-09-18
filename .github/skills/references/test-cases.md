# Gringo Calc Regression Cases

## USD focus

- 100 USD produces Cien dólares.
- 50.23 USD produces Cincuenta dólares con veintitrés centavos.
- 1.01 USD produces Un dólar con un centavo.

## Exchange-rate focus

- 443 produces Cuatrocientos cuarenta y tres colones por dólar.
- A decimal rate preserves the calculator's configured precision.

## CRC focus

- 1.500.000 produces Un millón quinientos mil colones.
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