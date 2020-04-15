let expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("Generate Message", () => {
    it("should generate correct message object", () => {
        let from = "testname",
            text = "random test"
        generatedMsg = generateMessage(from, text);

        //  check created object contains date as a number
        expect(typeof generatedMsg.createdAt).toBe("number");

        //  check generated message object conatins from and 
        expect(generatedMsg).toMatchObject({ from, text })

        expect(generatedMsg.from) == from;
        expect(generatedMsg.text) == text;


    })
})


describe("Generate Location Message", () => {
    it("SHould generate correct Location Object", () => {
        let from = "testLoc",
            lat = 15,
            long = 46,
            url = `https://www.google.com/maps?q=${lat},${long}`,
            generatedLocMsg = generateLocationMessage(from, lat, long);

        expect(typeof generatedLocMsg.createdAt).toBe("number");
         expect(generatedLocMsg).toMatchObject({ from, url });
    })
})