Role('JooseX.Observable', {
    
    /*VERSION,*/
    
    use : [ 
        'JooseX.Observable.Channel',    
        'JooseX.Observable.Listener' 
    ],
    
    
//    trait   : 'JooseX.Observable.Meta',
    
    
    has : {
        rootChannel             : function () { return new JooseX.Observable.Channel() },
        
        suspendCounter          : 0
    },
    
        
    methods : {
        
        getBubbleTarget : function () {
        },
        
        
        on : function (path, func, scope, options) {
            if (!func) throw "Empty handler for event: " + path
            
            var channels    = path.split('/')
            var eventName   = channels.pop()
            
            if (channels.length && !channels[ 0 ]) channels.shift()
            
            var channel     = this.rootChannel.getChannel(channels.slice())
            
            var listener    = new JooseX.Observable.Listener(Joose.O.extend(options || {}, {
                channel     : channel,
                eventName   : eventName,
                
                func        : func,
                scope       : scope
            }))
            
            channel.addListener(listener)
            
            return listener
        },
        
        
        un : function (event, func, scope) {
            
            if (event instanceof JooseX.Observable.Listener) {
                
                event.remove()
                
                return
            }

            var channels    = path.split('/')
            var eventName   = channels.pop()
            
            if (channels.length && !channels[ 0 ]) channels.shift()
            
            var channel     = this.rootChannel.getChannel(channels.slice())
            
            channel.removeListenerByHandler(eventName, func, scope)
        },
        
        
        emit : function () {
            return this.fireEvent.apply(this, arguments)
        },
        
        
        fireEvent : function () {
            if (this.suspendCounter) return
            
            var args = Array.prototype.slice.call(arguments)
            
            var path = args.shift()
            
            var channels    = path.split('/')
            var eventName   = channels.pop()
            
            if (!eventName || eventName == '*' || eventName == '**') throw new Error("Can't fire an empty event or event with `*`, `**` names ")
            
            if (channels.length && !channels[ 0 ]) channels.shift()
            
            
            var activators  = []
            
            this.rootChannel.getListenersFor(channels, eventName, activators)
            
            var res             = true
            var me              = this
            
            Joose.A.each(activators, function (activator) {
                
                res = res && activator.listener.activate(me, me, path, activator.splat, args) !== false
            })
                
            return res
        },
        
        
        propagateEvent : function (source, path, args) {
            if (this.suspendCounter) return
            
            var channels    = path.split('/')
            var eventName   = channels.pop()
            
            if (channels.length && !channels[ 0 ]) channels.shift()
            
            
            var activators  = []
            
            this.rootChannel.getListenersFor(channels, eventName, activators)
            
            var res             = true
            var me              = this
            
            Joose.A.each(activators, function (activator) {
                
                res = res && activator.listener.activate(source, me, path, activator.splat, args) !== false
            })
                
            return res
        },
        
        
//        hasListenerFor : function (eventName) {
//            this.listeners      = this.listeners || {}
//            
//            var eventListeners  = this.listeners[ eventName ]
//            
//            return eventListeners && eventListeners.length
//        },
        
        
        purgeListeners  : function () {
            this.rootChannel = new JooseX.Observable.Channel()
        },
        
        
        suspendEvents : function () {
            this.suspendCounter++
        },
        
        
        resumeEvents : function () {
            this.suspendCounter--
            
            if (this.suspendCounter < 0) this.suspendCounter = 0
        }
    }
})