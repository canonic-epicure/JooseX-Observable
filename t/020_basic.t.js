StartTest(function(t) {
    
    //======================================================================================================================================================================================================================================================
    t.diag('Sanity')
    
    t.ok(JooseX.Observable, "JooseX.Observable is here")
    
    
    Class('TestClass', {
        
        does        : JooseX.Observable
    
    })
    
    
    t.ok(TestClass, "TestClass has been created")
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Events')
    
    var scope   = {}

    var test    = new TestClass()
    
    test.on('test', function (obj, arg1, arg2) {
        
        t.pass('Event fired')
        
        t.ok(this == scope, 'Event fired in the correct scope')
        
        t.ok(obj == test && arg1 == 1 && arg2 == 10, 'Event fired with correct arguments')
    
    }, scope)

    
    test.fireEvent('test', test, 1, 10)
        
        
    t.done()
})    
