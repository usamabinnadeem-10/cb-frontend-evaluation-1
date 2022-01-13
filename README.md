# CB Frontend Evaluation
## Level 1

#### Q: What is the difference between "section" and "div" tag?
A: The section tag has a specific meaning as compared to the generic div tag. In that sense, it conveys meaning that the content inside it is grouped together and the information contained inside has an interconnected meaning. For instance, we could use a section in a blog which has a specific meaning inside, a part of a story that needs to have a separate heading for it. A div tag on the other hand would not convey that special meaning. The heading in that would have no special meaning that the following content is tied to the heading.

#### Q: Which CSS units you're going to use in this project? And why?
A: I am using percentages and rems. Using rems allows me to adjust to the user's default font size which I have set to 62.5% as default (equals 10px). The reason for using percentages is that it allows me to take up a specific percentage no matter which viewport I am viewing on. This helps reduce the amount of breakpoints that I introduce in the application and allows for a more robust code.

#### Q: What is Coercion?
A: Coercion in simple terms means type casting, whether implicit or explicit. It works both for **primitives** and **objects**. It converts every data type to one of the three types (object or primitive)
- String
- Boolean
- Number

#### Q: Do you use any Callbacks functions? and Why?
A: I used callbacks for creating dummy data for the menu because I needed to map on an array.

#### Q: What will print on the console? and why?
<img src="https://file.io/m0274K6UdnbA">
A: Result: 1

Reason: myVar declared in the end has a global scope and function 'b' refers to that variable. myVar declared inside function 'a' does not override the global value of myVar, so 1 is printed instead of 2.
