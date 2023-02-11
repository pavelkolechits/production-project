import { classNames } from "./classNames"

describe("classNames", () =>{
    test("test" ,() => {
        expect( classNames("classNames", {},[])).toBe("classNames")
    })
    
})