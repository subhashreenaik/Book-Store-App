import React from 'react';
import CustomTextFields from '../utils/CustomTextFields'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {AdminService} from '../../service/AdminService'
import RefreshIcon from '@material-ui/icons/Refresh';
import '../../css/AddBookForm.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CbHeader from "../utils/CbHeader";
import CustomSnackBar from "../utils/CustomSnackBar";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CbFooter from "../utils/CbFooter";
import Image from "../../assets/Bob.jpg";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: "", authorName: "", description: "", isbn: "",
            quantity: "", bookPrice: "", publishingYear: "", imageUrl: "",imageName:"Select Book Image",
            book: " ", author: " ", Isbn: " ", descriptionOne: " ",
            year: " ", quantity1: " ", price: " ", err: "", abc: "", flag: false,
            snackFlag: false, snackMessage: "", bookError: "", authorError:"", isbnError:"",descriptionError:"",
            quantityError:"",priceError:"",yearError:"",severity:"error",color:"black"
        };
    }

    handleReset = (e) => {
        this.refs.form.reset();
        this.setState({
            bookName: "", authorName: "", description: "", isbn: "",
            quantity: "", bookPrice: "", publishingYear: "", imageUrl: "",imageName:"Select Book Image",
            book: " ", author: " ", Isbn: " ", descriptionOne: " ",
            year: " ", quantity1: " ", price: " ", err: "", abc: "", flag: false,
            snackFlag: false, snackMessage: "", bookError: "", authorError:"", isbnError:"",descriptionError:"",
            quantityError:"",priceError:"",yearError:"",severity:"error"
        })
    }



    myData = () => {
        const DTOdata = {
            bookName: this.state.bookName,
            authorName: this.state.authorName,
            bookPrice: this.state.bookPrice,
            isbn: this.state.isbn,
            quantity: this.state.quantity,
            description: this.state.description,
            imageUrl: "assets/design.png",
            publishingYear: this.state.publishingYear
        }
        return DTOdata
    }

    handleSave=(e) =>{
        if (this.state.err === false) {
            new AdminService().addbook(e,this.myData()).then(response => {
                this.setState({
                    snackMessage: response.data.message,
                    snackFlag: true,
                    severity:response.data.message==="Book Added Successfully"? "success":"error",
                })
                this.clear()
            }).catch((response) => {
                this.setState({
                    snackMessage: "Fields cannot be empty",
                    snackFlag: true,
                })
                this.clear()
            })
        } else {
            this.setState({
                flag: true,
                err: true
            })
        }
        this.clear()
    }

    clear=()=>{
        if(this.state.severity === "success")
        {
            setTimeout(() => {
                this.setState({
                    bookName: "", authorName: "", description: "", isbn: "",
                    quantity: "", bookPrice: "", publishingYear: "", imageName: "Select Book Image",
                    book: " ", author: " ", Isbn: " ", descriptionOne: " ",
                    year: " ", quantity1: " ", price: " ", err: "", abc: "", flag: false,
                    snackFlag: false, snackMessage: "", bookError: "", authorError:"", isbnError:"",descriptionError:"",
                    quantityError:"",priceError:"",yearError:"",severity:"error"
                })
                this.refs.form.reset();
            }, 3000);
        }
        else {
            setTimeout(() => {
                this.setState({
                    snackFlag:false
                })
            }, 5000);
        }
    }

    bookNameValidation=(event,error)=>{
        let bookPattern= "^\\w"
        if(!event.target.value.match(bookPattern)){
            this.setState({
                [event.target.id]: "Book name cannot be empty",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    authorNameValidation=(event,error)=>{
        let authorPattern="[A-Za-z. ]{3,}[ ]*[A-Za-z.]*$"
        if(!event.target.value.match(authorPattern)){
            this.setState({
                [event.target.id]: "Should contain min 3 character",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        }
        else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    isbnValidation=(event,error)=>{
        let isbnPattern="^\\w{10}$"
        if(!event.target.value.match(isbnPattern)){
            this.setState({
                [event.target.id]: "ISBN should have 10 characters",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    quantityValidation=(event,error)=>{
        let quantityPattern="[1-9]{1,}[0-9]*$"
        if(!event.target.value.match(quantityPattern)){
            this.setState({
                [event.target.id]: "Should be greater than zero",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    bookPriceValidation=(event,error)=>{
        let bookPricePattern="[1-9]{1,}[0-9]*$"
        if(!event.target.value.match(bookPricePattern)){
            this.setState({
                [event.target.id]: "Should be greater than zero",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    descriptionValidation=(event,error)=>{
        let descriptionPattern="^\\w{1,300}"
        if(!event.target.value.match(descriptionPattern)){
            this.setState({
                [event.target.id]: "Description cannot be empty",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    publishingYearValidation=(event,error)=>{
        let publishingYearPattern="^\\d{4}$"
        if(!event.target.value.match(publishingYearPattern)){
            this.setState({
                [event.target.id]: "Should contain 4 digit value",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                err: false,
            })
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    imagePath = (event) => {
        const formData = new FormData();
        formData.append('file',event.target.files[0]);
        new AdminService().uploadFile(formData).then(response=>{
            this.setState({
                imageName: response.data.message === "Only .jpg & .png Image Are Allowed" ? "Only .jpg & .png Image Are Allowed" : response.data.fileName ,
                color: response.data.message === "Only .jpg & .png Image Are Allowed" ? "red" : "black",
                imageUrl:response.data.fileDownloadUri
            })
        }).catch(response=>{
            console.log(response)
        })

    }


    render() {

        return (
            <div>
                <CbHeader/>
                <div>
                    <div id="mainform">
                        <h1>Book Details </h1>
                        <Card id="maincard" variant="outlined" style={{border: "1px solid black", boxShadow: "5px 5px 10px #888888"}}>
                            <CardContent>
                                <form className="root" ref="form"
                                >
                                    <div id="formContent">
                                        <div className="firsttextbox">
                                            <CustomTextFields
                                                required={true}
                                                error={this.state.bookError}
                                                name="bookName" label="Book Name" onChange={this.changeState} id="book"
                                                variant="outlined"
                                                className="textfield"
                                                onBlur={(e)=>this.bookNameValidation(e,"bookError")}
                                                helperText={this.state.book}
                                            />
                                            <CustomTextFields
                                                required={true}
                                                error={this.state.authorError}
                                                label="Author Name" onChange={this.changeState} name="authorName"
                                                id="author"
                                                helperText={this.state.author}
                                                variant="outlined" className="textfield"
                                                onBlur={e => this.authorNameValidation(e,"authorError")}
                                            />
                                        </div>
                                        <div className="text">
                                            <CustomTextFields
                                                required={true}
                                                label="ISBN" name="isbn" id="Isbn" onChange={this.changeState}
                                                variant="outlined" className="textfield"
                                                error={this.state.isbnError}
                                                onBlur={e => this.isbnValidation(e,"isbnError")}
                                                helperText={this.state.Isbn}
                                            />
                                            <CustomTextFields label="Quantity" onChange={this.changeState} id="quantity1"
                                                              variant="outlined"
                                                              className="textfield"
                                                              required={true}
                                                              error={this.state.quantityError}
                                                              name="quantity" onBlur={e => this.quantityValidation(e,"quantityError")}
                                                              helperText={this.state.quantity1}
                                            />
                                        </div>
                                        <div className="text">
                                            <CustomTextFields label="Book Price" onChange={this.changeState} name="bookPrice"
                                                              id="price"
                                                              variant="outlined" className="textfield"
                                                              error={this.state.priceError}
                                                              required={true}
                                                              onBlur={e => this.bookPriceValidation(e,"priceError")}
                                                              helperText={this.state.price}
                                            />
                                            <CustomTextFields label="Publishing Year" onChange={this.changeState} id="year"
                                                              variant="outlined"
                                                              name="publishingYear"
                                                              error={this.state.yearError}
                                                              required={true}
                                                              onBlur={e => this.publishingYearValidation(e,"yearError")}
                                                              helperText={this.state.year}
                                                              className="textfield"
                                            />
                                        </div>
                                        <div className="description">
                                            <CustomTextFields
                                                onBlur={e => this.descriptionValidation(e,"descriptionError")}
                                                error={this.state.descriptionError}
                                                id="descriptionOne"
                                                helperText={this.state.descriptionOne}
                                                multiline rows={2} fullWidth inputProps={{maxLength: 250}}
                                                label="Description" onChange={this.changeState}
                                                placeholder={"Max 250 words"}
                                                variant="outlined"
                                                name="description" className="textfield1"/>
                                        </div>
                                        <div className="input1">
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <AddPhotoAlternateIcon style={{fontSize:"250%"}}/> </IconButton> </label>
                                            <input
                                                type="file"
                                                required={true}
                                                name="imageUrl"
                                                id="icon-button-file"
                                                className="selectButton"
                                                style={{visibility:"hidden"}}
                                                multiple
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => this.imagePath(e)}
                                            />
                                            <label style={{color:this.state.color,display: "inline-block"}}>{this.state.imageName}</label>
                                        </div>
                                        <div className="btn">
                                            <Button variant="contained"
                                                    style={{backgroundColor: "limegreen", color: "white"}}
                                                    size="large" className="button"
                                                    type={"submit"}
                                                    onClick={(e) => this.handleSave(e)}
                                                    startIcon={<SaveIcon/>}
                                            > Save </Button>
                                            <Button variant="contained" style={{backgroundColor: "crimson", color: "white"}}
                                                    size="large" className="button"
                                                    onClick={this.handleReset} startIcon={<RefreshIcon/>}> Reset </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {this.state.snackFlag &&
                    <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity} />
                    }
                </div>
                <CbFooter/>
            </div>

        )
    }
}
export default AdminPage;