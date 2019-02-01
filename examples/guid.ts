import { Guid } from "../src/Utilities/Guid";

// string
Guid.Empty();

// create a new guid
Guid.NewId();

// test a string is a guid
Guid.Validate('')  //false
Guid.Validate(Guid.NewId())  //true