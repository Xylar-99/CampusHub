const prisma = require('../db/db')
const dataUser = require('../utils/fetchUser')


const path = require('path')
const util = require('util');
const pump = util.promisify(require('stream').pipeline);
const fs = require('fs')



async function postnewPostHandler(req , res)
{

    const user1 = await dataUser.getUserByRequest(req);


    const data_of_post = {};
    const parts = req.parts();

    for await (const part of parts) 
    {
      if (part.type === 'file')
        {
        const uploadPath = path.join('/var/www/html/frontend/uploads', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath)); 
        data_of_post.img = "../uploads/" + part.filename;
        }
      else
            data_of_post[part.fieldname] = part.value;
    
    }
    data_of_post.userId = user1.id;
    await prisma.post.create({data:data_of_post});
    return res.redirect('/profile')
}


module.exports = {postnewPostHandler }