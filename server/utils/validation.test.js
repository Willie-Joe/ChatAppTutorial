const expect = require("expect");


const { isRealString } = require("./isRealString");

describe("is String valid", () => {
    it("should reject non string values", () => {
        let res = isRealString(65);
        expect(res).toBe(false);
    });

    it("should reject strings with only spaces", () => {
        let res = isRealString("         ");
        expect(res).toBe(false);
    });

    it("should allow string with non space characters", () => {
        let res = isRealString("  test  ");
        expect(res).toBe(true);
    });

});