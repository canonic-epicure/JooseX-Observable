Class('JooseX.Observable.Channel', {
    
    has : {
        eventName   : null,
        
        func        : null,
        scope       : null,
        
        options     : Joose.I.Object
    },
    
        
    methods : {
        
        activate : function (source, args) {
            
            var res = this.func.apply(this.scope || source, args)
            
            if (this.options.single) source.un(this)
            
            return res
        }
    }
})


