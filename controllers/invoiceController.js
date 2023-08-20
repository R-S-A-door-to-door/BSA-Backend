const Invoices = require("../models/invoice")


// Creates new invoice 
exports.generateInvoice = async(req, res, next) => {
    try{
        const results = await Invoices.create({
            username : req.body.username,
            refNumber : req.body.refNumber,
            senderName : req.body.senderName,
            senderContact: req.body.senderContact,
            senderLocation: req.body.senderLocation,
            receiverName : req.body.receiverName,
            receiverContact : req.body.receiverContact,
            receiverLocation : req.body.receiverLocation,
            items : req.body.items
        })

        if(results){
            res.status(201).json({
                status : "success",
                message: "Successfully generated an invoice",
                data : {
                    invoice : results
                }
            })

            return
        }

        res.status(400).json({
            status:"fail",
            message : "Invoice generation failed."
        })

    }catch(error){
        res.status(500).json({
            status: 'error',
            message : "An error occured, try again"
        })
        next(error)
    }
}


// get all invoices 
exports.getAllInvoices = async(req, res, next) => {
    try{
        const skip = req.params.skip
        const limit = req.params.limit
        const offset = skip * limit;
        const result = await Invoices.find().skip(offset).limit(limit);

        if(result){
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved invoices",
                results : result.length,
                data : {
                    result
                }
            })
        }

        return res.status(404).json({
            status : "Fail",
            message: "No invoice found"
        })
              

    }catch(error){
        res.status(500).json({
            status: "Error",
            message: "An Error occured, try again."
        })
        next(error)
    }

}

// get invoice details
exports.getInvoiceDetails= async(req, res, next) => {
    try{
        const result = await Invoices.find({refNumber: req.params.refNumber})

        if(result.length !== 0){
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved invoice details",
                data : {
                    result
                }
            })
        }
        return res.status(400).json({
            status : "Fail",
            message: "No invoice found"
        })
              

    }catch(error){
        res.status(500).json({
            status: "Error",
            message: "An Error occured, try again."
        })
        next(error)
    }

}


// get worker's invoices
exports.getWorkerInvoices= async(req, res, next) => {
    try{
        const result = await Invoices.find({username: req.params.username})

        if(result.length !== 0){
            return res.status(200).json({
                status: "Success",
                message: `Successfully retrieved ${req.params.username}'s invoice`,
                results: result.length,
                data : {
                    result
                }
            })
        }

        return res.status(400).json({
            message: `No invoice found for ${req.params.username}`
        })
              

    }catch(error){
        res.status(500).json({
            status: "Error",
            message: "An Error occured, try again."
        })
        next(error)
    }

}
