const express = require('express');
const router = express.Router();
const {
  getFamilyMembers,
  addFamilyMember,
  deleteFamilyMember,
} = require('../controllers/familyController');

router.get('/get', getFamilyMembers);
router.post('/add', addFamilyMember);
router.delete('/delete/:email', deleteFamilyMember);

module.exports = router;
