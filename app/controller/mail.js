const nodemailer = require('nodemailer');

module.exports = app => {
  class mailController extends app.Controller {
    async index() {
      const ctx = this.ctx;
      const transport = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 25,
        secure: false,
        auth: {
          type: 'login',
          user: 'qq876173839@163.com',
          pass: '1992124fei'
        }
      });

      const recipients = ['qq876173839@163.com', 'feirenjie@zbj.com', '876173839@qq.com', 'ranguangyu@zbj.com'];
      const content = `<div id="contentDiv" onmouseover="getTop().stopPropagation(event);" onclick="getTop().preSwapLink(event, 'html', 'ZC3024-fHPIcigyvIWqZ1MIsIrqC86');" style="position:relative;font-size:14px;height:auto;padding:0 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;" class="body">    <div id="qm_con_body"><div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style=""><style>
                    *{margin:0;padding:0;}
                    .show_items_1 .friends_item_2,.show_items_1 .friends_item_3,.show_items_1 .friends_item_4{display:none;}
                    .show_items_2 .friends_item_3,.show_items_2 .friends_item_4{display:none;}
                    .show_items_3 .friends_item_4{display:none;}
                    a.button_send:hover{background-color:#2f90e1 !important;}
                
                    .qqmlMC 					{ width:100%;text-align:center;font-size:14px;font-family:Verdana,Tahoma,Arial; }
                    .qqmlMC	.qqmlColumn			{ width:577px;text-align:left;margin:0 auto; }
                    .qqmlMC	.qqmlHeader			{ width:577px;height:270px;overflow:hidden;background:url( https://res.mail.qq.com/zh_CN/htmledition/images/letter/birthday/birth_top.jpg) no-repeat #eff0e0;}
                    .qqmlMC	.qqmlBody			{ background:url(https://res.mail.qq.com/zh_CN/htmledition/images/letter/birthday/birth_middle.png) repeat-y #f3f3f3;}
                    .qqmlMC	.qqmlContent		{ width:473px;margin:0 12px;padding:12px 40px 0;line-height:160%; background:url(https://res.mail.qq.com/zh_CN/htmledition/images/letter/birthday/birth_middle_x.png) repeat-x left bottom #f3f3f3;}
                    .qqmlMC	.qqmlContent iframe	{ width:473px;}
                    .qqmlMC	.qqmlFooter			{ height:17px;background:url(https://res.mail.qq.com/zh_CN/htmledition/images/letter/birthday/birth_bottom.png) no-repeat #f7f7f7;}
                
                    .qqmlMC .qqmlTitle			{ height:63px;*height:87px;padding:24px 20px 0 20px; }
                    .qqmlMC .qqmlTitle h1, h2	{ color:#fff;padding:0;margin:0;}
                    .qqmlMC .qqmlTitle h1		{ font-size:16px;line-height:100%; }
                    .qqmlMC .qqmlTitle h2		{ font-size:14px;font-weight:normal;line-height:100%;padding:12px 0; }
                
                    .qqmlMC .qqmlBody p			{ padding:4px 0;margin:0; }
                    .qqmlMC .qqmlBody .graytext	{ color:#999; }
                </style>
                
                <div id="notWebmail" class="container" style="margin: 22px 18px; display: none;">
                    <div class="e_detail" style="line-height:20px;font-size:16px;margin-bottom:18px;">
                        <p style="margin:0;padding:0 0 6px 0;">Hi，￥Flyer§Jay:</p>
                        <p style="margin:0;padding:0 0 6px 0;">你的好友马上要过生日了，送份祝福表达心意吧！</p>
                    </div>
                    <div class="friends_box show_items_4" style="max-width: 558px;">
                        <table cellpadding="0" border="0" cellspacing="0" width="100%">
                            <tbody><tr>
                                <td style="width:48px;vertical-align:top;">
                                    <div class="friends_item_1">
                                        <img style="width:48px;height:48px;display:block;border-radius:5px;" src="http://mail.qq.com/cgi-bin/getqqicon?u=-3763085061&amp;pixel=256">
                                        <span style="display:block;font-size:12px;text-align:center;line-height:15px;white-space: nowrap;word-wrap: normal;
                            width: 48px;margin:10px auto 0 auto;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;-webkit-text-overflow: ellipsis;text-overflow:
                            ellipsis;">爱湜寂寞潵嘚谎</span>
                                        <span style="display:block;font-size:10px;text-align:center;color:#8d8d8d;line-height:15px;">6月28日</span>
                                    </div>
                                </td>
                                <td>&nbsp;</td>
                                <td style="width:48px;vertical-align:top;">
                                    <div class="friends_item_2">
                                        <img src="https://mail.qq.com/cgi-bin/getqqicon?u=-2494621087&amp;pixel=256" style="width:48px;height:48px;display:block;border-radius:5px;margin:0 auto;">
                                        <span style="display:block;font-size:12px;text-align:center;margin:10px auto 0 auto;line-height:15px;white-space: nowrap;word-wrap: normal;
                                width: 48px;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;-webkit-text-overflow: ellipsis;text-overflow:
                                ellipsis;">浪漫鸿鹄</span>
                                        <span style="display:block;font-size:10px;text-align:center;color:#8d8d8d;line-height:15px;">6月30日</span>
                                    </div>
                                </td>
                                <td>&nbsp;</td>
                                <td style="width:48px;vertical-align:top;">
                                    <div class="friends_item_3">
                                        <img style="width:48px;height:48px;display:block;border-radius:5px;margin:0 auto;" src="http://mail.qq.com/cgi-bin/getqqicon?u=-2518559862&amp;pixel=256">
                                        <span style="display:block;font-size:12px;text-align:center;line-height:15px;white-space: nowrap;word-wrap: normal;
                                width: 48px;margin:10px auto 0 auto;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;-webkit-text-overflow: ellipsis;text-overflow:
                                ellipsis;">我是熊宝宝。</span>
                                        <span style="display:block;font-size:10px;text-align:center;color:#8d8d8d;line-height:15px;">7月1日</span>
                                    </div>
                                </td>
                                <td>&nbsp;</td>
                                <td style="width:48px;vertical-align:top;">
                                    <div class="friends_item_4">
                                        <img src="https://mail.qq.com/cgi-bin/getqqicon?u=-908151352&amp;pixel=256" style="width:48px;height:48px;display:block;border-radius:5px;margin:0 auto;">
                                        <span style="display:block;font-size:12px;text-align:center;margin:10px auto 0 auto;line-height:15px;white-space: nowrap;word-wrap: normal;
                                width: 48px;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;-webkit-text-overflow: ellipsis;text-overflow:
                                ellipsis;">此人已消失</span>
                                        <span style="display:block;font-size:10px;text-align:center;color:#8d8d8d;line-height:15px;">7月3日</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody></table>
                    </div>
                
                    <a class="button_send" href="http://mail.qq.com/cgi-bin/sendcard?t=birthday_wx_sendTo&amp;step=1&amp;sendcardkey=01BD6CD1EB5E389BAE900ECD638280E5BD43EE759E65E72BDBE8C754F981B0CF47460701EE12AB3F35D2928136E45B645C11154B38C7616E" style="margin-top:30px;display:block;background-color:#2b85d0;border-radius:5px;color:#fff;height:45px;font-size:18px;line-height:45px;text-align:center;text-decoration: none;cursor:pointer;max-width:558px;" target="_blank">发送祝福</a>
                </div>
                <div id="webmail" style="">
                    <div id="qqmlMC" class="qqmlMC">
                        <div class="qqmlHeader qqmlColumn">
                        </div>
                        <div class="qqmlBody qqmlColumn">
                            <div class="qqmlContent">
                                <p id="qqmlNickName">Hi，￥Flyer§Jay：</p>
                                <p>
                                    <span id="notifyBirthFriend">你的好友马上要过生日了，送份祝福表达心意吧！</span>
                                </p>
                
                                <script type="text/javascript">
                                    try{
                                        if(window.location && (/^(m\d+\.|set\d\.)?mail.qq.com$/.test(window.location.hostname) || "webdev.mail.qq.com"==window.location.hostname) ){
                                            document.getElementById("notWebmail").style.display="none";
                                            document.getElementById("webmail").style.display="";
                                            document.write( '<iframe src="/cgi-bin/laddr_friend?func=birthcard&t=birth_friendlist_new&sid=' + top.g_sid + '&s=mail&birthbegin=20180626&birthend=20180703&bitype=normal" width="100%" height="270" frameborder="0" scrolling="no" ></iframe>' );
                                            document.getElementById( "notifyBirthFriend" ).innerHTML = "你的好友马上要过生日了，送份祝福表达心意吧！";
                
                                            var _sUserAlias = getTop().getUserInfo("alias");
                                            if(_sUserAlias && _sUserAlias != "")
                                            {
                                                document.getElementById( "qqmlNickName" ).innerHTML = "Hi，" + _sUserAlias + "：";
                                            }
                                (new Image()).src="//rl.mail.qq.com/cgi-bin/getinvestigate?sid=nZLbyZMu_MHxLhpB&kvclick=getinvestigate|readmail|birthremind|web"
                                        }
                                    }
                                    catch(e){}
                
                                </script><iframe src="/cgi-bin/laddr_friend?func=birthcard&amp;t=birth_friendlist_new&amp;sid=nZLbyZMu_MHxLhpB&amp;s=mail&amp;birthbegin=20180626&amp;birthend=20180703&amp;bitype=normal" width="100%" height="270" frameborder="0" scrolling="no"></iframe>
                
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                        <div class="qqmlFooter qqmlColumn">
                        </div>
                    <img style="display:none;" src="//rl.mail.qq.com/cgi-bin/getinvestigate?sid=nZLbyZMu_MHxLhpB&amp;kvclick=getinvestigate|readmail|birthremind|all">
                    <img style="display:none;" src="//rl.mail.qq.com/cgi-bin/getinvestigate?sid=nZLbyZMu_MHxLhpB&amp;kvclick=getinvestigate|readmail|birthremind|webmail">
                    </div>
                </div>
                <style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div></div><!-- --><style>#mailContentContainer .txt {height:auto;}</style>  </div>`;
      ctx.body = {
        message: '邮件发送处理中'
      };

      for (let i = 0, l = recipients.length; i < l; i++) {
        const mailOptions = {
          from: '"诈骗团伙公司"<qq876173839@163.com>',
          to: recipients[i],
          subject: '诈骗信息请注意！！！',
          html: content
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', JSON.stringify(info));
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
      }
    }
  }
  return mailController;
};