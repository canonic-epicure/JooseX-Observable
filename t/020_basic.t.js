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
    
    var listener1Called = 0
    var listener2Called = 0
    
    
    var listener1 = test.on('test', function (e, obj, arg1, arg2) {
        
        listener1Called++
        
        t.ok(this == scope, 'Event fired in the correct scope')
        
        t.ok(obj == test && arg1 == 1 && arg2 == 10, 'Event fired with correct arguments')
    
    }, scope)


    
    var listener2 = test.on('test', function (e, obj, arg1, arg2) {
        
        listener2Called++
        
        t.ok(this == test, 'Default scope is the source of event')
    })
    
    
    test.fireEvent('test', test, 1, 10)
    
    t.ok(listener1Called == 1, 'Listener called once #1')
    t.ok(listener2Called == 1, 'Listener called once #2')
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Suspending')
    
    
    test.suspendEvents()
    test.suspendEvents()
    
    test.fireEvent('test', test, 1, 10)

    t.ok(listener1Called == 1, 'Listener has not been called #1')
    t.ok(listener2Called == 1, 'Listener has not been called #2')
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Resuming')
    
    test.resumeEvents()
    
    test.fireEvent('test', test, 1, 10)
    
    t.ok(listener1Called == 1, 'Listener has not been called #3')
    t.ok(listener2Called == 1, 'Listener has not been called #4')

    
    test.resumeEvents()
    
    test.fireEvent('test', test, 1, 10)
    
    t.ok(listener1Called == 2, 'Listener called twice #1')
    t.ok(listener2Called == 2, 'Listener called twice #2')
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Removing listener')
    
    test.un(listener2)
    
    test.fireEvent('test', test, 1, 10)
    
    t.ok(listener1Called == 3, 'Listener called 3 times')
    t.ok(listener2Called == 2, 'Listener was removed')
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Purging listeners')
    
    test.purgeListeners()
    
    test.fireEvent('test', test, 1, 10)
    
    t.ok(listener1Called == 3, 'Listener was purged')
    
    
    t.done()
})    
