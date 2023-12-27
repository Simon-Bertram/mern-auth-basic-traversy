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
