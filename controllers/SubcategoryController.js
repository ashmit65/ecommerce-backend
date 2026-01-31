const Subcategory = require("../models/Subcategory");

async function createRecord(req, res) {
    try {
        const data = new Subcategory(req.body);
        await data.save();
        res.send({result: "Done", data:data});
    } catch (error) {
        console.log(error)
        const errorMessage = [];
        error.errors?.keyValue?.name? errorMessage.push({name:"Subcategory Already Exists"}):"", 
        error.errors?.name? errorMessage.push({name:error.errors.name.message}):"";
        errorMessage.length===0 ? 
        res.status(500).send({result:"Fail", reason:"Internal server error"}):
        res.status(500).send({result:"Fail", reason:errorMessage})
    }
}

async function getAllRecords(req, res) {
    try{
        const data = await Subcategory.find().sort({_id:-1});
        res.send({result:"Done", count:data.length, data:data})
    }catch(err) {
        res.status(500).send({result:"Fail", reason:"Internal server error"})
    }
}

async function getSingleRecord(req, res) {
    try{
        // const data = await Subcategory.findOne().sort({_id:req.params._id});
        const data = await Subcategory.findById(req.params._id);
        
        if(data)
            res.send({result:"Done", data:data})
        else
            res.send({result:"Fail", reason:"Invalid ID, No record Found"})
    }catch(err) {
        console.log(err)
        res.status(500).send({result:"Fail", reason:"Internal server error"})
    }
}

async function updateRecord(req, res) {
    try{
        // const data = await Subcategory.findOne().sort({_id:req.params._id});
        const data = await Subcategory.findById(req.params._id);
        
        if(data){
            data.name = req.body.name?? data.name;
            data.active = req.body.active?? data.active;
            await data.save()
            res.send({result:"Done",data:data, message:"Record Updated Successfully"})
        }
        else
            res.send({result:"Fail", reason:"Invalid ID, No record Found"})
    }catch(error) {
        console.log(error)
        const errorMessage = [];
        error.errors?.keyValue?.name? errorMessage.push({name:"Subcategory Already Exists"}):"",

        error.errors?.name? errorMessage.push({name:error.errors.name.message}):"";
        errorMessage.length===0 ? 

        res.status(500).send({result:"Fail", reason:"Internal server error"}):
        res.status(500).send({result:"Fail", reason:errorMessage})
    }
}

async function deleteRecord(req, res) {
    try{
        // const data = await Subcategory.findOne().sort({_id:req.params._id});
        // const data = await Subcategory.findById(req.params._id);
        const data = await Subcategory.findByIdAndDelete(req.params._id);
        
        if(data){
            // await data.deleteOne();
            res.send({result:"Done", message:"Record Deleted Successfully"})
        }
        else
            res.send({result:"Fail", reason:"Invalid ID, No record Found"})
    }catch(err) {
        console.log(err)
        res.status(500).send({result:"Fail", reason:"Internal server error"})
    }
}

module.exports = {
    createRecord,
    getAllRecords,
    getSingleRecord,
   updateRecord,
   deleteRecord
}