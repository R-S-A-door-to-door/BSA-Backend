const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const validator = require('validator')



const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: [false , 'FirstName is required']
	},
	username : {
		type : String,
		required: [true, 'Username is required'],
		unique : true,
	},
	password: {
		type: String,
		required: [true, 'Provide a password'],
		minlength: 4,
		select: false
	},
	contact : {
		type : String,
		required: [false, 'Contact is required'],
	},
	isAdmin : {
		type: Boolean,
		default: false
	},
	orgId : {
		type: String,
		default: "01"
	},
	invoices : [String],
	dateOfBirth : Number,
}, { timestamps: true })


userSchema.pre('save', async function(next){
	// checks if password is not modified
	if(!this.isModified('password')) return next();

	// encrypts password
	this.password = await bcrypt.hash(this.password, 12);

	next()
})



userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
	return await bcrypt.compare(candidatePassword, userPassword)
}


const Users = mongoose.model("Users", userSchema);

module.exports = Users;