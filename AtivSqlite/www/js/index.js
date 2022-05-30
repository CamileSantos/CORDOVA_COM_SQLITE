var app = {
        
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInsere").addEventListener("click",app.insere);
        document.getElementById("btnLista").addEventListener("click",app.lista);
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        db = window.sqlitePlugin.openDatabase({
            name: 'my.db',
            location: 'default',            
            androidDatabaseProvider: 'system'
        });

        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (login, pass)');
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            alert('Aplicações Válidas!');
        });
    },

    insere: function(){
        let login = document.getElementById("login").value;
        let pass = document.getElementById("password").value;

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO usuarios VALUES (?,?)', [login, pass]);
        }, function(error) {
            alert('Algo deu errado! ' + error.message);
        }, function() {
            alert('Inserção realizada com sucesso!');
        });
    },
    
    lista: function(){
        db.executeSql(
            'SELECT login AS uLoginName, pass AS uPassword FROM usuarios', [], function(rs) {
                alert(JSON.stringify(rs));
                alert(rs.rows.length);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    alert(JSON.stringify(recordItem));
                }                

        }, function(error) {
            alert('Erro no SELECT: ' + error.message);
        });
    }
};

app.initialize();