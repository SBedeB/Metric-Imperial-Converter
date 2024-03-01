function ConvertHandler() {

  // Extracts the numerical part of the input for conversion.
  this.getNum = function(input) {
    let result;
    // Extract the numerical part before the first letter (unit)
    const numInput = input.match(/^[\d./]+/);
    const numString = numInput ? numInput[0] : "1"; // Default to "1" if no number is provided

    // Handling a double-fraction error
    if ((numString.match(/\//g) || []).length > 1) {
      return 'invalid number'; // Return error for double-fraction, mapping to the test checking for double-fraction input.
    }

    // Evaluate single fraction if present
    if (numString.includes('/')) {
      const [numerator, denominator] = numString.split('/').map(Number);
      result = numerator / denominator;
    } else {
      result = Number(numString); // Parse directly for whole numbers and decimals
    }

    // Check for invalid numbers (NaN, infinity)
    if (isNaN(result) || !isFinite(result)) {
      return 'invalid number'; // Maps to tests checking for invalid number input.
    }

    return result; // Maps to tests for correctly reading whole, decimal, and fractional inputs.
  };

  // Extracts and returns the unit part of the input string.
  this.getUnit = function(input) {
      let result;
      const unitRegex = /[a-zA-Z]+$/;
      result = input.match(unitRegex)[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      if (!validUnits.includes(result)) {
        return 'invalid unit'; // Maps to tests checking for invalid unit input.
      }
      return result === 'l' ? 'L' : result; // Special handling for liter to maintain case sensitivity, mapping to unit case sensitivity tests.
  };

  // Determines and returns the corresponding unit for conversion.
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    let result = unitMap[initUnit];
    return result; // Maps to tests verifying the correct return unit for each input unit.
  };

  // Returns the full name of a unit for display.
  this.spellOutUnit = function(unit) {
    const unitsFull = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    return unitsFull[unit] || 'invalid unit'; // Maps to tests for correctly spelling out units in conversion results.
  };

  // Performs the unit conversion.
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592,
    };
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5)); // Maps to tests for accurate conversion calculations.
  };

  // Formats and returns a string describing the conversion.
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Maps to tests verifying the string output accurately describes the conversion.
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
