const prisma = require('../db/db')



async function postStoreHandler(req , res) 
{
    const { table } = req.params;
    try 
    {
        await prisma[table].create({data : req.body})
    } 
    catch (error) 
    {
        console.log("not store data in databae" , table);
        return res.send({msg : false})
    }

    return res.send({msg : true})
}


async function postFindHandler(req , res) 
{
    const { table } = req.params;
    try 
    {
       const user =  await prisma[table].findUnique(req.body)
       return user;
    } 
    catch (error) 
    {
        console.log("not find data in databae" , table);
        return res.send({msg : false})
    }

    return res.send({msg : true})
}


async function postUpdateHandler(req , res) 
{
    const { table } = req.params;
    try 
    {
        await prisma[table].update(req.body)
    } 
    catch (error) 
    {
        console.log("not update data in databae" , table);
        return res.send({msg : false})
    }

    return res.send({msg : true})
}


module.exports = {postStoreHandler , postUpdateHandler , postFindHandler }