Role('JooseX.Observable', {
    
    /*VERSION,*/
    
    use : [ 'JooseX.Observable.Listener' ],
    
    
    has : {
        listeners       : Joose.I.Object,
        
        suspend         : 0
    },
    
        
    methods : {
        
        on : function (event, func, scope, options) {
            
            if (!func) throw "Empty handler for event: " + event
            
            var listener    = new JooseX.Observable.Listener({
                
                eventName   : event,
                
                func        : func,
                scope       : scope,
                
                options     : options || {}
            })
            
            var listeners       = this.listeners
            var eventListeners  = listeners[ event ] = listeners[ event ] || []
            
            eventListeners.push(listener)
            
            return listener
        },
        
        
        un : function (event, func, scope) {
            
            if (event instanceof JooseX.Observable.Listener) {
                
                var listenerToRemove    = event
                var eventListeners      = this.listeners[ listenerToRemove.eventName ]
                
                Joose.A.each(eventListeners, function (listener, index) {
                    
                    if (listener == listenerToRemove) {
                        
                        eventListeners.splice(index, 1)
                        
                        return false
                    }
                })
                
            } else {
                eventListeners      = this.listeners[ event ]
                
                Joose.A.each(eventListeners, function (listener, index) {
                    
                    if (listener.func == func && listener.scope == scope) {
                        
                        eventListeners.splice(index, 1)
                        
                        return false
                    }
                })
            }
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
        
        
        hasListenerFor : function (eventName) {
            var eventListeners = this.listeners[ eventName ]
            
            return eventListeners && eventListeners.length
        },
        
        
        purgeListeners  : function () {
            this.listeners = {}
        },
        
        
        suspendEvents : function () {
            this.suspend++
        },
        
        
        resumeEvents : function () {
            this.suspend--
            
            if (this.suspend < 0) this.suspend = 0
        }
    },
    
    
    before : {
        
        destroy : function () {
            this.purgeListeners()
        }
    }
})