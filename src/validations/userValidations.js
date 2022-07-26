const userModel = require('../model/userModel')
const userValidations = async function (req, res, next) {
    try {
        let data = req.body;
        // Checks whether body is empty or not

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Body cannot be empty" });

        // Checks whether title is empty or is enter as a string or contains the enumerator values or not.
        if (!data.title) return res.status(400).send({ status: false, msg: " Please enter Title" });

        if (typeof data.title !== "string") return res.status(400).send({ status: false, msg: "Please enter title as a String" });

        let titles = ["Mr", "Mrs", "Miss"];

        data.title = data.title.trim();

        if (!titles.includes(data.title)) return res.status(400).send({ status: false, msg: "Please enter title as Mr, Mrs or Miss only", });
        // Checks whether data name is empty or is enter as a string or contains only letters

        if (!data.name) return res.status(400).send({ status: false, msg: "Please enter user name" });

        if (typeof data.name !== "string") return res.status(400).send({ status: false, msg: "Please enter user name as a String" });

        let validname = /^\w[a-zA-Z.,\s]*$/;

        data.name = data.name.trim();

        if (!validname.test(data.name)) return res.status(400).send({ status: false, msg: "The user name may contain only letters" });

          //  phone validations

          if (!data.phone) return res.status(400).send({ status: false, msg: "Please Enter Phone Number" });
          if (typeof data.phone !== "string") return res.status(400).send({ status: false, msg: " Please enter only phone number of 10 digits & put in string" });
          let validPhone = /^[6-9]\d{9}$/
          if (!validPhone.test(data.phone)) return res.status(400).send({ status: false, msg: "The user phone number should be indian may contain only 10 number" });
          let phone = data.phone;
          let duplicatePhone = await userModel.find({ phone: phone });
          if (duplicatePhone.length !== 0) return res.status(400).send({ status: false, msg: `${phone} already exists` });
  
        // email validations

        if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });

        if (typeof data.email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });

        let email = data.email;

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Entered email is invalid" });

        let duplicateEmail = await userModel.find({ email: email });

        if (duplicateEmail.length !== 0) return res.status(400).send({ status: false, msg: `${email} already exists` });

      
        // Checks whether password is empty or is enter as a string or a valid pasword.
        if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" });

        if (typeof data.password !== "string") return res.status(400).send({ status: false, msg: " Please enter password as a String" });

        let validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

        if (!validPassword.test(data.password)) return res.status(400).send({ status: false, msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number" });

        // check address validations
        if(Object.keys(data.address).length==0) return res.status(400).send({ status: false, message: "Address cannot be empty String & number" });
        if (typeof data.address !="object") return res.status(400).send({ status: false, msg: "Address body  should be in object form" });
            
        if(data.address.street)
        if (typeof data.address.street!== "string") return res.status(400).send({ status: false, msg: " Please enter street as a String" });
        if(data.address.city)
        if (typeof data.address.city!== "string") return res.status(400).send({ status: false, msg: " Please enter city as a String" });
        if(data.address.pincode)
        if (typeof data.address.pincode!== "string") return res.status(400).send({ status: false, msg: " Please enter pincode as a String" });
        let pincode = data.address.pincode;
        if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, msg: " Please Enter Valid Pincode Of 6 Digits" });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: error.message });
    }
};
module.exports = { userValidations }
