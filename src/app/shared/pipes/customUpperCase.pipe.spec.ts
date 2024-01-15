import { CustomUpperCasePipe } from './customUpperCase.pipe'

describe("CustomUpperCasePipe", () => {
  const customUpperCasePipe = new CustomUpperCasePipe();

  it("should return 'ANGULAR TEST'", () => {
    const textTransformed = customUpperCasePipe.transform('angular test');

    expect(textTransformed).toEqual("ANGULAR TEST");
  });
});
