const router = require("express").Router();

const {
    createBranch,
    updateBranch,
    getBranch,
    deleteBranch,
    getBranchs
}   =   require("../../controllers/System/branchControllers");

const { branchValidation } = require("../../utils/validator/System/branchValidator");

router.route("/").get(getBranchs);

router.post('/create' , branchValidation, createBranch);

router.put('/:id', branchValidation, updateBranch);

router.get('/:id', getBranch);

router.delete('/:id', deleteBranch);


module.exports = router;