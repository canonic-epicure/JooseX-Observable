StartTest(function(t) {
    
    //======================================================================================================================================================================================================================================================
    t.diag('Sanity')
    
    t.ok(JooseX.Observable, "JooseX.Observable is here")
    
    
    Class('TestClass', {
        
        does        : JooseX.Observable,
        
        has : {
            bubbleTarget    : { is : 'rw' }
        }
    
    })
    
    
    t.ok(TestClass, "TestClass has been created")
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('Events')
    
    var test    = new TestClass()
    
    var listenersCalled 
    
    
    var reset = function () {
        listenersCalled = [ 0, 0, 0, 0 ]
    }

    
    var listener0 = test.on('/test', function (e) {
        
        listenersCalled[ 0 ]++
    })


    var listener1 = test.on('/test/*', function (e) {
        
        listenersCalled[ 1 ]++
    })
    
    
    var listener2 = test.on('/test/**', function (e) {
        
        listenersCalled[ 2 ]++
    }, null, { single : true })
    
    
    var listener3 = test.on('/**', function (e) {
        
        listenersCalled[ 3 ]++
    }, null, { single : true })
    
    
    
    //======================================================================================================================================================================================================================================================
    t.diag('hasListenerFor')
    
    t.ok(test.hasListenerFor('/test'), 'Test has listeners for `test` event #1')
    t.ok(test.hasListenerFor('/test/foo'), 'Test has listeners for `test` event #2')
    t.ok(test.hasListenerFor('/test/foo/bar'), 'Test has listeners for `test` event #3')
    

    //======================================================================================================================================================================================================================================================
    t.diag('Hierarchical events')
    
    reset()
    test.fireEvent('/test')
    
    t.is_deeply(listenersCalled, [ 1, 0, 0, 1 ], 'Correct listeners fired')

    
    reset()
    test.fireEvent('/test/')
    
    t.is_deeply(listenersCalled, [ 0, 1, 1, 0 ], 'Listeners with `single` option has not been called already')
    

    reset()
    test.fireEvent('/test/foo')
    
    t.is_deeply(listenersCalled, [ 0, 1, 0, 0 ], 'Listeners with `single` option has not been called already')
    
    t.done()
})    
