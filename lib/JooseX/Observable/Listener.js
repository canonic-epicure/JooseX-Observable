Class('JooseX.Observable.Listener', {

    use : [ 
        'JooseX.Observable.Event'    
    ],
    
    
    has : {
        channel     : { required : true },
        eventName   : { required : true },
        
        func        : { required : true },
        scope       : null,
        
        single      : false
//        ,
//        buffer      : 0,
//        delay       : null,
//        defer       : null
    },
    
        
    methods : {
        
        activate : function (source, current, path, splat, args) {
            
            var event   = new JooseX.Observable.Event({
                source      : source,
                current     : current,
                
                name        : path,
                splat       : splat,
                
                args        : args
            }) 
            
            var res = this.func.apply(this.scope || source, [ event ].concat(args) )
            
            if (this.single) this.remove()
            
            if (event.bubbling) {
                
                var further = current.getBubbleTarget()
                
                if (further) res = res && further.propagateEvent(source, path, args) !== false
            } 
            
            return res
        },
        
        
//        doActivate : function (source, current, path, splat, args) {
//        },
        
        
        remove : function () {
            this.channel.removeListener(this)
        }
    }
})


