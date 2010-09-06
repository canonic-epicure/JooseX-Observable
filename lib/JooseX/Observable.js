Role('JooseX.Observable', {
    
    /*VERSION,*/
    
    use : [ 'JooseX.Observable.Listener' ],
    
    
    has : {
        listeners       : Joose.I.Object,
        
        suspend         : 0
    },
    
        
    methods : {
        
        on : function (event, func, scope, options) {
            
            var listener = new JooseX.Observable.Listener({
                
                func        : func,
                scope       : scope,
                
                options     : options
            })
            
            var listeners       = this.listeners
            var eventListeners  = listeners[ event ] = listeners[ event ] || []
            
            eventListeners.push(listener)
        },
        
        
        un : function (event, func, scope) {
        },
        
        
        fireEvent : function () {
            if (this.suspend) return
            
            var args = Array.prototype.slice.call(arguments)
            
            var name = args.shift()
            
            if (!name) throw "Name not supplied to `fireEvent`"
            
            
            var me              = this
            
            var eventListeners  = this.listeners[ name ]
            
            if (eventListeners)
                Joose.A.each(eventListeners.slice(), function (listener) {
                    listener.activate(me, args)
                })
        },
        
        
        suspendEvents : function () {
            this.suspend++
        },
        
        
        resumeEvents : function () {
            this.suspend--
            
            if (this.suspend < 0) this.suspend = 0
        }
    }

})