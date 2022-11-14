function test(a, b, c) {
    if(c !== undefined) {
        console.log(a + b + c);
    }
    else console.log(a+b);
}


test(1,2);

test(1,2,3);