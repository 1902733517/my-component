test('test common matcher', () => {
    expect( 2 + 2 ).toBe(4)   //等于
    expect(2 + 2).not.toBe(5) //不等于
})

test('test to be true or false', () => {
    expect(1).toBeTruthy()   // 为 true
    expect(0).toBeFalsy()    // 为 false
})

test('test to number', () => {
    expect(4).toBeGreaterThan(3)  // 大于
    expect(2).toBeLessThan(3)  // 小于
}) 

test('test to object', () => {
    expect({name: 'ali'}).toEqual({name: 'ali'})  //toEqual 判断值相同
})
