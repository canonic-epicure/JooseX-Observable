Class('JooseX.Observable.Listener', {
    
    has : {
        source      : { required : true },
        eventName   : { required : true },
        
        func        : { required : true },
        scope       : null,
        
        options     : Joose.I.Object
    },
    
        
    methods : {
        
        activate : function (args) {
            
            var res = this.func.apply(this.scope || this.source, args)
            
            if (this.options.single) this.cancel()
            
            return res
        },
        
        
        cancel : function () {
            this.source.un(this)
        }
    }
})


