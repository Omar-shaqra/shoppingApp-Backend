const Branch = require("../../models/System/branchModel");

const createBranch = async (req, res) => {
    const { name, storeId, address, description} = req.body
    try {
    const branch = Branch.create({
        name, 
        storeId, 
        address,
        description
    });
        res.status(201).json({ message: 'Branch created successfully' });
    }catch(error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

const updateBranch = async(req, res) => {
    const { id } = req.params;
    const { name, storeId, address, description} = req.body;
    try{
        const update = {
            name:name,
            storeId:storeId, 
            address:address, 
            description:description,
        }
        let updateBranch = await Branch.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json({ data: updateBranch});
    }catch{
        res.status(500).send({ message: 'Server error'});
    }
}

const getBranch = async(req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(404);
        return;
    }

    try{
        const doc = await Branch.findById(id)
        res.status(200).json({ data: doc });
    } catch {
        res.status(404);
    }
    
}

const deleteBranch = async (req, res) => {
    const { id } = req.params;
    const deletebrand = await Branch.findByIdAndDelete(id);
    if (!deletebrand) {
        res.status(404).json({msg : "error : id of branch is not found"});
        return;
    }
    res.status(202).send();
}

const getBranchs = async (req, res) => {
    await Branch.find()
        .then((branchs)=>{
            res.status(200).json({ results: branchs.length, data: branchs });
        })
        .catch((error) => {
            response.status(500).json({ error: error.message });
        });
}


module.exports = {
    createBranch,
    updateBranch,
    getBranch,
    deleteBranch,
    getBranchs
}