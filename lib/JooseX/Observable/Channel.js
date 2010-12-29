Class('JooseX.Observable.Channel', {
    
    has : {
        channels    : Joose.I.Object,
        
        listeners   : Joose.I.Object
    },
    
        
    methods : {
        
        // (!) segments array will be destroyed in this method
        getListenersFor : function (segments, name, activators) {
            var listeners = this.listeners
            
            if (listeners[ '**' ]) {
                
                var splat       = segments.concat(name)
                
                Joose.A.each(listeners[ '**' ], function (listener) {
                    activators.push({
                        listener    : listener,
                        splat       : splat
                    })
                })
            }
            
            if (segments.length)
                this.getSingleChannel(segments.shift()).getListenersFor(segments, name, activators)
            else {
                
                if (listeners[ '*' ])
                    Joose.A.each(listeners[ '*' ], function (listener) {
                        
                        activators.push({
                            listener    : listener,
                            splat       : name
                        })
                    })
                
                if (listeners[ name ])  
                    Joose.A.each(listeners[ name ], function (listener) {
                        
                        activators.push({
                            listener    : listener
                        })
                    })
            }
        },
        
        
        hasListenerFor : function (segments, name) {
            var listeners = this.listeners
            
            if (listeners[ '**' ] && listeners[ '**' ].length) return true
            
            if (segments.length)
                return this.getSingleChannel(segments.shift()).hasListenerFor(segments, name)
            else {
                
                if (listeners[ '*' ] && listeners[ '*' ].length) return true
                
                if (listeners[ name ] && listeners[ name ].length) return true  
            }
            
            return false
        },
        
        
        addListener : function (listener) {
            var eventName   = listener.eventName
            var listeners   = this.listeners
            
            listeners[ eventName ] = listeners[ eventName ] || []
            
            listeners[ eventName ].push(listener)
        },
        
        
        removeListener : function (listenerToRemove) {
            var eventListeners      = this.listeners[ listenerToRemove.eventName ]
            
            Joose.A.each(eventListeners, function (listener, index) {
                
                if (listener == listenerToRemove) {
                    
                    eventListeners.splice(index, 1)
                    
                    return false
                }
            })
        },
        
        
        removeListenerByHandler : function (eventName, func, scope) {
            var eventListeners      = this.listeners[ eventName ]
            
            Joose.A.each(eventListeners, function (listener, index) {
                
                if (listener.func == func && listener.scope == scope) {
                    
                    eventListeners.splice(index, 1)
                    
                    return false
                }
            })
        },
        
        
        getSingleChannel : function (name) {
            var channels    = this.channels
            
            if (channels[ name ]) return channels[ name ]
            
            return channels[ name ] = new JooseX.Observable.Channel()
        },
        
        
        // (!) segments array will be destroyed in this method
        getChannel : function (segments) {
            if (!segments.length) return this
            
            return this.getSingleChannel(segments.shift()).getChannel(segments)
        }
    }
})


