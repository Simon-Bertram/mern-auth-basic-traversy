import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        dropDups: true,
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          }
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8,
    },
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false 
    }
}, { 
  timestamps: true 
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;