import { Type } from "../src/Utilities/Type";

Type('')  //string
Type({})  //object
Type(function () { }) //function
Type(new Date()) //date
Type(22)  //number
Type(/sss/)  //regexp
Type([])  //array