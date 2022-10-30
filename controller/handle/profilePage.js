const fs = require('fs');
const PROFILE_PAGE = require('../../service/profileService');
const qs = require('qs')
const cookie = require("cookie");

class ProfilePage {
    static getDataProfile(infoProfile, infoHtml, userInfo) {
        let infoIMG = ''
        let products = ''
        let noData = ""
        // infoHtml = infoHtml.replace('{useName}', infoProfile[0].username);
        infoHtml = infoHtml.replace('{urlAvt}', infoProfile[0].link_avt);
        infoHtml = infoHtml.replaceAll('{nickName}', infoProfile[0].name);
        infoHtml = infoHtml.replace('{userName}', userInfo[0].name)
        infoHtml = infoHtml.replace('{imgAvt}', userInfo[0].link_avt)
        infoHtml = infoHtml.replace('{isStatus}', infoProfile[0].status_name)
        infoProfile.forEach((item) => {
            if (item.text_1 != null) {
                infoHtml = infoHtml.replace('{text_1}', infoProfile[0].text_1);
            } else {
                infoHtml = infoHtml.replace('{text_1}', noData);
            }
            if (item.text_2 != null) {
                infoHtml = infoHtml.replace('{text_2}', infoProfile[0].text_2);
            } else {
                infoHtml = infoHtml.replace('{text_2}', noData);
            }
            if (item.text_3 != null) {
                infoHtml = infoHtml.replace('{text_3}', infoProfile[0].text_3);
            } else {
                infoHtml = infoHtml.replace('{text_3}', noData);
            }

            if (item.link_pic_1 != null) {
                infoIMG += `<img src="${item.link_pic_1}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_2 != null) {
                infoIMG += `<img src="${item.link_pic_2}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_3 != null) {
                infoIMG += `<img src="${item.link_pic_3}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_4 != null) {
                infoIMG += `<img src="${item.link_pic_4}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            products += `<tr>
            <td>${item.product_name}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td><a href="" class="btn btn-danger">Add</a></td>
        </tr>`

        })
        infoHtml = infoHtml.replace('{img}', infoIMG);
        infoHtml = infoHtml.replace('{products}', products)
        return infoHtml;
    }

    profilePage(req, res, userName) {
        fs.readFile('./views/profile.html', "utf-8", async (err, profileHtml) => {
            if (err) {
                console.log(err)
            } else {
                let cookies = cookie.parse(req.headers.cookie || '');
                // console.log("cookies",cookies)
                let infoProfile = await PROFILE_PAGE.findByUserName(userName);
                let userInfo = await PROFILE_PAGE.findById(cookies.id)
                console.log("info page", userInfo)
                profileHtml = ProfilePage.getDataProfile(infoProfile, profileHtml, userInfo);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(profileHtml);
                res.end()
            }
        })
    }

    static getDataMyProfile(infoHtml, userInfo) {
        let infoIMG = ''
        let products = ''
        let noData = ""
        // infoHtml = infoHtml.replace('{useName}', infoProfile[0].username);
        infoHtml = infoHtml.replace('{urlAvt}', userInfo[0].link_avt);
        infoHtml = infoHtml.replaceAll('{name}', userInfo[0].name);
        infoHtml = infoHtml.replace('{userName}', userInfo[0].name)
        infoHtml = infoHtml.replace('{imgAvt}', userInfo[0].link_avt)
        infoHtml = infoHtml.replace('{isStatus}', userInfo[0].status_name)
        userInfo.forEach((item) => {
            if (item.text_1 != null) {
                infoHtml = infoHtml.replace('{text_1}', userInfo[0].text_1);
            } else {
                infoHtml = infoHtml.replace('{text_1}', noData);
            }
            if (item.text_2 != null) {
                infoHtml = infoHtml.replace('{text_2}', userInfo[0].text_2);
            } else {
                infoHtml = infoHtml.replace('{text_2}', noData);
            }
            if (item.text_3 != null) {
                infoHtml = infoHtml.replace('{text_3}', userInfo[0].text_3);
            } else {
                infoHtml = infoHtml.replace('{text_3}', noData);
            }

            if (item.link_pic_1 != null) {
                infoIMG += `<img src="${item.link_pic_1}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_2 != null) {
                infoIMG += `<img src="${item.link_pic_2}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_3 != null) {
                infoIMG += `<img src="${item.link_pic_3}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            if (item.link_pic_4 != null) {
                infoIMG += `<img src="${item.link_pic_4}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
            }
            products += `<tr>
            <td>${item.product_name}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td><a href="" class="btn btn-danger">Edit</a></td>
            <td><a href="" class="btn btn-danger">Delete</a></td>
        </tr>`

        })
        infoHtml = infoHtml.replace('{img}', infoIMG);
        infoHtml = infoHtml.replace('{products}', products)
        return infoHtml;
    }

    myProfilePage(req, res) {
        fs.readFile('./views/myProfile/myProfile.html', "utf-8", async (err, myProfileHtml) => {
            if (err) {
                console.log(err)
            } else {
                let cookies = cookie.parse(req.headers.cookie || '');
                // console.log("cookies",cookies)
                let userInfo = await PROFILE_PAGE.findById(cookies.id)
                // console.log("info page", userInfo)
                myProfileHtml = ProfilePage.getDataMyProfile(myProfileHtml, userInfo);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(myProfileHtml);
                res.end()
            }
        })
    }
}

module.exports = new ProfilePage();
