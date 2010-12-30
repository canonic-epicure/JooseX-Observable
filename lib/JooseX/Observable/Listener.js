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
        
        activate : function (event, args) {
            
            if (this.single) this.remove()
            
            var res = this.func.apply(this.scope || event.source, [ event ].concat(args) ) !== false
            
            return res
        },
        
        
//        doActivate : function (source, current, path, splat, args) {
//        },
        
        
        remove : function () {
            this.channel.removeListener(this)
        }
    }
})


