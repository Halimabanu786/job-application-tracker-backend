const mongoose=require("mongoose");
const jobSchema=new mongoose.Schema({
    companyName: {
        type:String,
        required:true
    },

    jobRole: {
        type:String,
        required:true
    },
    

    applicantName: {
        type: String,
        required: true
    },
    location: {
        type:String
    },

    appliedDate: {
        type:Date,
        default:Date.now
    },

    status: {
        type:String,
        enum: ["Applied", "Interview", "Selected", "Rejected"],
        default: "Applied"
    }
});

module.exports=mongoose.model("Job", jobSchema);
