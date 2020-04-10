let expect = require("expect");

var {generateMessage} = require("./message");

describe("Generate Message", () => {
    it("should generate correct message object",()=>{
        let from = "testname",
         text = "random test"
         generatedMsg = generateMessage(from,text);

        //  check created object contains date as a number
         expect(typeof generatedMsg.createdAt).toBe("number");
         
        //  check generated message object conatins from and 
         expect(generatedMsg).toMatchObject({from,text})

         expect(generatedMsg.from) == from;
         expect(generatedMsg.text) == text;


    })
})