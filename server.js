'use strict';
const FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    express = require('express'),
    Router = require('falcor-router')
const app = express()

const data = {
    names: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
    ]
}

const NamesRouter = Router.createClass([
    // Total number of names.
    {
        route: 'names.length',
        get() {
            return {
                path: ['names', 'length'],
                value: data.names.length
            }
        }
    },
    // Display n records
    // route eg
    // [   { path: ['names', 0, 'name'], value: 'a' },
    //     { path: ['names', 1, 'name'], value: 'b' }]
    {
        route: 'names[{integers:nameIndexes}]["name"]',
        get(pathSet) {
            let results = []
            console.log(pathSet)
            pathSet.nameIndexes.forEach(nameIndex => {
                console.log(nameIndex)
                if (data.names.length > nameIndex) {
                    results.push({
                        path: ['names', nameIndex, 'name'],
                        value: data.names[nameIndex].name
                    })
                }
            })
            console.log(results)
            return results
        }
    },
    // Add a new record
    // POST eg
    // [   { path: ['names', 3, 'name'], value: 'bob' },
    //     { path: ['names', 'length'], value: 4}   ]
    {
        route: 'names.add',
        call(callPath, args) {
            let newName = args[0]
            data.names.push({ name: newName })
            let record = [
                {
                    path: ['names', (data.names.length - 1), 'name'],
                    value: newName
                },
                {
                    path: ['names', 'length'],
                    value: data.names.length
                }
            ]
            console.log(record)
            return record
        }
    }
])

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()))
app.use(express.static('.'))
app.listen(9090, error => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`listening to 9090`)
})
