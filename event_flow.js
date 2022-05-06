//以下为游戏基础数据参数
var memory=2,life=3,money=5;//定义最初的属性
var node=0,max=20;//定义了通过的节点个数和最大值
var addchoice=document.getElementById("addchoice");//此处为选择框的位置
var addstory=document.getElementById("addstory");//此处为叙事框的位置
var addwarning=document.getElementById("addwarning");//此处为警告框的位置
var addprocess=document.getElementById("addprocess");//此处为过程显示的位置
var choice=new Array();//定义存放选择和对应脚本的数组
var game_data=['游戏流程：'];//定义存放用户游戏过程的数组
var item=[
    {name:"罗德岛构造图",effect_text:"可通过的最大节点数+5",price:6,effect_script:"max+=5",script:"",resusable:false,repurchasable:false},
    {name:"罗德岛构造图",effect_text:"可通过的最大节点数+5",price:6,effect_script:"max+=5",script:"",resusable:false,repurchasable:false},
    {name:"罗德岛构造图",effect_text:"可通过的最大节点数+5",price:6,effect_script:"max+=5",script:"",resusable:false,repurchasable:false}
];//定义商店中可能出现的物品
var owned_item=new Array();//已拥有的物品
var get_money=0;
//以下为特殊事件触发参数
var p_frost=false,frost=false;
var inshop=false;
//下列全部为游戏基础函数
function createbutton(choice){//生成选择按钮
    for(var n=0;n<choice.length;n++){
        var newbutton = document.createElement("input");
        var brDiv = document.createElement('br');
        newbutton.type = "button";
        newbutton.id = "button"+n;
        newbutton.value = choice[n]['text'];
        addchoice.appendChild(newbutton);
        addchoice.appendChild(brDiv);
        document.getElementById("button"+n).onclick=Function(choice[n]['script']+';del_choice();game()');
    }
}
function opening(){//开始
    rewrite_property();
    document.getElementById("next").style="display:none";
    addstory.innerHTML='在开始新的旅程前，请从下面选择一项：';
    let choice=[{text:"带走热水壶：生命值+1，记忆+1",script:"life+=1;memory+=1"},{text:"记忆+2",script:"memory+=2"},{text:"生命值+2",script:"life+=2"}];
    createbutton(choice);
}
function del_choice(){//清空choice数组内容
    addchoice.innerHTML="";
    rewrite_property();
}
function game(){//游戏控制主函数
    addwarning.innerHTML='';
    if(life<=0){//判定生命值为0
        life0_gameover();
        game_data.push('你因失去生命而结束探索');
        return 0;
    }
    if(memory<=0){//判定记忆为0
        memory0_gameover();
        game_data.push('你因记忆涣散而结束探索');
        return 0;
    }
    if(node>=max){//判定节点大于最大值
        endding();
        return 0;
    }
    event();
}
function rewrite_item(){//重写拥有的物品
    if(owned_item.length>0){
        document.getElementById("items").innerHTML="已拥有物品:";
        for(var n=0;n<owned_item.length;n++){
            document.getElementById("items").innerHTML+='<br>'+owned_item[n].name+':'+owned_item[n].effect_text;
        }
    }
}
function rewrite_property(){//重写属性
    document.getElementById("p_memory").innerHTML="记忆："+memory;
    document.getElementById("p_life").innerHTML="生命值："+life;
    document.getElementById("p_money").innerHTML="源石锭："+money;
    document.getElementById("p_node").innerHTML="已通过节点："+node;
}
function randomly(possibility){//传入一个概率，看此事件是否成立
    var random=Math.random();
    if(random<=possibility) return true;
    else return false;
}
function warning(str){//属性不足警告
    addwarning.innerHTML='当前的'+str+'不足，无法选择该选项';
    return 0;
}
//下列全部为事件函数
function event(){//存放事件
    //首先判断特殊事件是否成立
    if(p_frost) {
        frostnova(randomly(0.02));
        return 0;
    }
    //以下判定随机普通事件
    var random=Math.floor(Math.random()*17+1);
    //random=6;
    switch(random){
        //强制增减事件
        case 1:if(randomly(0.7)){addstory.innerHTML='你在走廊上走着，突然感觉被人撞了一下，一个黑发的菲林从你身边经过，从她的口袋中掉出来两个亮晶晶的东西，你捡了起来，是两枚源石锭';choice=[{text:"可是刚刚掉钱的那个人究竟是谁呢？（源石锭+2）",script:"money+=2;game_data.push('遇到了掉钱的菲林')"}];createbutton(choice);node++;}else{game();}break;
        case 2:if(randomly(0.7)){addstory.innerHTML='你走进一个房间，房间中有一张床，一股困意袭来，你不自觉地躺在上面昏沉地睡去......';choice=[{text:"睡了一觉（生命值+1）",script:"life+=1;game_data.push('来到了有床的房间');p_frost=true"}];createbutton(choice);node++;}else{game();}break;
        case 3:if(randomly(0.7)){addstory.innerHTML='这个走廊的墙上挂着许多合照，有一些照片中有你，有一些照片中没有你。看着这些照片，你感到既熟悉却又陌生......';choice=[{text:"仿佛回忆起了什么（记忆+1）",script:"memory+=1;game_data.push('来到了有很多旧照片的走廊')"}];createbutton(choice);node++;}else{game();}break;
        case 4:if(randomly(0.4)){addstory.innerHTML='当你意识到自己的腰间轻了一点时已经晚了，你摸摸口袋，发现口袋里的源石锭莫名其妙少了一点';choice=[{text:"刚刚是不是有只卡特斯从前面的拐角经过？（源石锭-3）",script:"(money>=3)?money-=3:money=0;game_data.push('遭遇了盗贼卡特斯')"}];createbutton(choice);node++;}else{game();}break;
        case 5:if(randomly(0.4)){addstory.innerHTML='一个抱着重型电锯的娇小女孩冒冒失失地向你冲了过来，你躲闪不及，被撞翻在地，她向你道了个歉后就飞快地走了';choice=[{text:"这孩子哪来的这么大力气（生命值-2）",script:"life-=2;game_data.push('遭遇了莽撞的电锯少女')"}];createbutton(choice);node++;}else{game();}break;
        case 6:if(randomly(0.1)){addstory.innerHTML='“前辈......”<br>这个温柔的声音使你全身一颤，你回过头，眼前坐在长椅上向你微笑的少女让你感觉十分熟悉，但是你却想不起来她究竟是谁。<br>看见你疑惑的神情，她的笑容中流露出一丝担心。<br>“前辈，您是累了吗？”她指了指自己白白嫩嫩的腿，“要是您不介意的话，就躺在艾雅法拉腿上休息一下吧。”说完这句话，她的脸变得有些红。<br>艾雅法拉？这个名字好像在哪里听到过。但是你没有想太多，躺在她的腿上沉沉睡去......';choice=[{text:"美美地睡了一觉（生命值+3，记忆+3）",script:"life+=3;memory+=3;game_data.push('偶遇了干员艾雅法拉');p_frost=true"}];createbutton(choice);node++;}else{game()}break;
        case 7:if(randomly(0.3)){addstory.innerHTML='你无意间来到了一个酒吧，有许多人坐在一起谈笑风生。一位可爱的黎博利少女在吧台后独自调酒。”请问您要喝点什么呢？“她问你';choice=[{text:"生命之水（生命值+2）",script:"life+=2;game_data.push('来到了酒吧并选择喝生命之水');node++"},{text:"荒地龙舌兰（记忆+2）",script:"memory+=2;game_data.push('来到了酒吧并选择喝荒地龙舌兰');node++"},{text:"请问这家酒吧有特殊服务吗？（暧昧语气）",script:"del_choice();addstory.innerHTML='少女露出了害羞的神情，旁边的酒客看见你在调戏她，围过来把你抬了起来，扔出了酒馆';choice=[{text:\"好的（生命值-2）\",script:\"life-=2;game_data.push('来到了酒吧并询问是否有特殊服务，被暴躁的酒客们扔了出去');node++\"}];createbutton(choice);return 0;"}];createbutton(choice);}else{game();}break;
        case 8:if(randomly(0.3)){addstory.innerHTML='旁边的长椅上有一个纸袋，你拿起来摇了摇，掉出来五颗源石锭';choice=[{text:"真是意外之财（源石锭+5）",script:"money+=5;game_data.push('发现了长椅上的纸袋')"}];createbutton(choice);node++;}else{game();}break;
        //随机数事件
        case 9:if(randomly(0.3)){addstory.innerHTML='一位全身上下都是奢侈品的金发菲林走来，她看起来心情很好，她边走边从口袋里掏出源石锭抛洒：“今天我请客！”旁边的人都凑过去捡';choice=[{text:"跟着一起捡（获得1~5源石锭）",script:"get_money=(Math.floor(Math.random()*4+1));del_choice();addstory.innerHTML='虽然人很多，但是你还是捡到了'+get_money+'颗源石锭';choice=[{text:\"好的（源石锭+\"+get_money+\"）\",script:\"money+=get_money;game_data.push('遇到了扔钱的菲林大小姐，捡到了'+get_money+'颗源石锭');node++\"}];createbutton(choice);return 0"}];createbutton(choice);}else{game();}break;
        case 10:if(randomly(0)){addstory.innerHTML='你在走廊上走着，突然感觉被人撞了一下，一个黑发的菲林从你身边经过，从她的口袋中掉出来两个亮晶晶的东西，你捡了起来，是两枚源石锭';choice=[{text:"可是刚刚掉钱的那个人究竟是谁呢？（源石锭+2）",script:"money+=2;game_data.push('遇到了掉钱的菲林')"}];createbutton(choice);node++;}else{game();}break;
        //带选择事件
        case 11:if(randomly(0.4)){addstory.innerHTML='你听到一阵游戏的音效声，你向着传来声音的地方走去，一个血魔正玩得起劲，看见你过来，她盛情邀请你体验她制作的新游戏《狂弹要塞》';choice=[{text:"逝一逝？",script:"if(Math.random()>=0.5){del_choice();addstory.innerHTML='好像确实还不错？你沉迷于这个游戏，以至于忘记了更为紧要的事情';choice=[{text:\"（记忆-2）\",script:\"memory-=2;game_data.push('遇到了打游戏的血魔，沉迷于狂弹要塞无法自拔');node++\"}];createbutton(choice);return 0;}{del_choice();addstory.innerHTML='什么憨批游戏？你玩了一会儿就骂骂咧咧地走了，这个游戏让你想起了以前的某些经历';choice=[{text:\"（记忆+2）\",script:\"memory+=2;game_data.push('遇到了打游戏的血魔，她的游戏实在做得烂透了');node++\"}];createbutton(choice);return 0;}"},{text:"还是改日再体验吧",script:"1;game_data.push('遇到了打游戏的血魔，并拒绝了邀请');node++"}];createbutton(choice);}else{game();}break;
        case 12:if(randomly(0.5)){addstory.innerHTML='从一个小吃摊的锅里传出来的鲜美的鱼丸气味使你驻足不前，摆摊的乌萨斯人虽然看起来很冷淡，但是他的鱼丸实在是太香了';choice=[{text:"那就来一碗（源石锭-3，生命值+2）",script:"if(money>=3){money-=3;life+=2;game_data.push('遇到了摆摊的乌萨斯人，他的鱼丸真不错');node++;addwarning.innerHTML='';}else{warning('源石锭');return 0;}"},{text:"还是算了，感觉应该没有闻起来那么好吃",script:"game_data.push('遇到了摆摊的乌萨斯人，他的鱼丸真不错，可惜你买不起');node++;addwarning.innerHTML=''"}];createbutton(choice);}else{game();}break;
        case 13:if(randomly(0.5)){addstory.innerHTML='远处有一位看起来很老的女性神情严肃的拿着一份文件走过来，她穿着似乎只有年轻女性才会选择的衣服，而你不知为何能看出她是一名医生。她将要从你身边经过，虽然看起来很平，但她的耳朵似乎很柔软';choice=[{text:"上去摸一摸",script:"del_choice();addstory.innerHTML='虽然耳朵确实很软，但是随后你被那个女人暴打了一顿，这顿暴打让你想起了某段屈辱的记忆（生命值-5，记忆+5）';choice=[{text:\"好的\",script:\"life-=5;memory+=5;game_data.push('遇到了老女人，选择摸她耳朵，随后被当成了握力计');node++\"}];createbutton(choice);return 0;"},{text:"还是算了，这老女人一看就不好惹",script:"1;game_data.push('遇到了老女人，直接掉头逃走了');node++"}];createbutton(choice);}else{game();}break;
        case 14:if(randomly(0.5)){addstory.innerHTML='你闯进了一个平平无奇的房间，地上横七竖八的躺了许多人，一位炎国的女性坐在桌前翘着二郎腿邀请你与她一起用餐，而她的面前是一锅沸腾的红色汤水';choice=[{text:"我不吃",script:"1;game_data.push('遇到了很能吃辣的炎国人，还是不和她一起吃饭了');node++"},{text:"我吃一碗",script:"del_choice();addstory.innerHTML='确实很辣，但是你忍住了，炎国女性给了你几枚源石锭作为陪她吃饭的谢礼（生命值-1，源石锭+3）';choice=[{text:\"好的\",script:\"life-=1;money+=3;game_data.push('遇到了很能吃辣的炎国人，吃了一碗火锅');node++\"}];createbutton(choice);return 0;"},{text:"我吃两碗",script:"del_choice();addstory.innerHTML='你被辣得有些神志不清，但是这味道似乎有些熟悉？（生命值-2，记忆+2）';choice=[{text:\"好的\",script:\"life-=2;memory+=2;game_data.push('遇到了很能吃辣的炎国人，吃了两碗火锅');node++\"}];createbutton(choice);return 0;"}];createbutton(choice);}else{game();}break;
        case 15:if(randomly(0.3)){addstory.innerHTML='你走过一个转角，看见了一只异色瞳黄发菲林。她半边身子躲在阴影里，你选择？';choice=[{text:"看起来很可爱，靠近看看",script:"if(Math.random()>=0.5){del_choice();addstory.innerHTML='面前的菲林露出了可怕的笑容，然后你被梦魇缠绕了，你将在这个地方游荡更长的时间......';choice=[{text:\"（生命值-2，但是可通过的最大节点数+5）\",script:\"life-=2;max+=5;game_data.push('遇到了隐藏的猫猫，她“现在”似乎不大喜欢你');node++\"}];createbutton(choice);return 0;}{del_choice();addstory.innerHTML='面前的菲林微笑着抱住了你，你感到了从心底透露出的温暖';choice=[{text:\"（生命值+1，记忆+1）\",script:\"memory+=1;life+=1;game_data.push('遇到了隐藏的猫猫，她“现在”似乎很喜欢你');node++\"}];createbutton(choice);return 0;}"},{text:"还是不要靠近了，感觉有点危险",script:"1;game_data.push('遇到了隐藏的猫猫，但是你感受到了危险的气息');node++"}];createbutton(choice);}else{game();}break;
        case 16:if(randomly(0.3)){addstory.innerHTML='你在偌大的走廊迷了路，走廊里只有一位高大的菲林。你走上前去，他面无表情，手里还拿着一把令人生畏的大锯子';choice=[{text:"礼貌问路",script:"del_choice();addwarning.innerHTML='';addstory.innerHTML='菲林友好地告诉你了前进的路，能走的地方变多了';choice=[{text:\"好的（可通过的最大节点数+3）\",script:\"max+=3;game_data.push('遇到了高大的菲林，他友好地为你指路');node++\"}];createbutton(choice);return 0"},{text:"（突然想到什么）听说你的手工很好，能送我一个吗？",script:"if(memory>=10){del_choice();addstory.innerHTML='菲林想了想，从兜里摸出一个小巧的发卡递给了你';choice=[{text:\"获得道具“发卡”\",script:\"max+=3;game_data.push('遇到了高大的菲林，他友好地给了你一个发卡');owned_item.push({name:\\\"精致的发卡\\\",effect_text:\\\"剧情关键道具\\\",price:0,effect_script:\\\"\\\",script:\\\"\\\",resusable:false,repurchasable:false});rewrite_item();node++\"}];createbutton(choice);return 0;}else{warning('记忆');return 0;}"},{text:"算了我还是自己找路吧",script:"game_data.push('遇到了高大的菲林，害怕使你不敢接近他');node++"}];createbutton(choice);}else{game();}break;
        //商店事件
        case 17:if(randomly(0.3)){shop(0);game_data.push('你来到了旧货市场');}else{game();}break;
    }
}
//特殊事件
function shop(item_num){//商店事件
    if(!inshop)
    {
        addstory.innerHTML='这里似乎是这个设施的居住者们售卖各类物品的地方，虽然大多数东西看起来和破烂没多大区别，但是其中可能包含能让你对现状更加了解的东西......<br>怎么样，要不要买些什么？';
        //choice=[{text:"炭烤沙虫腿（源石锭-4，生命值+2）",script:"if(money>=4){money-=4;life+=2;game_data[game_data.length-1]+='<br>你购买了炭烤沙虫腿';rewrite_property();addwarning.innerHTML='';}else{warning('源石锭');return 0;}"},{text:"尘封的旧相册（源石锭-5，记忆+3）",script:"if(money>=5){money-=5;memory+=3;game_data[game_data.length-1]+='<br>你购买了尘封的旧相册';rewrite_property();addwarning.innerHTML='';}else{warning('源石锭');return 0;}"}];
        choice=[
            {name:"炭烤沙虫腿",effect_text:"生命值+2",price:4,effect_script:"life+=2",script:"",resusable:false,repurchasable:true},
            {name:"尘封的旧相册",effect_text:"记忆+3",price:5,effect_script:"memory+=3",script:"",resusable:false,repurchasable:true}
        ];
        if(item.length>0)
        {
            var random=Math.floor(Math.random()*item.length);
            choice.push(item[random]);
            item.splice(random,1);
        }
        choice.push({name:"离开",effect_text:"",price:0,effect_script:"",script:"inshop=false;node++;game_data[game_data.length-1]+='<br>你离开了旧货市场';addwarning.innerHTML='';del_choice();game()",resusable:false,repurchasable:false});
        inshop=true;
    }
    else{
        if(money>=choice[item_num].price){//判定是否满足购买这个物品的条件
            addwarning.innerHTML="";
            game_data[game_data.length-1]+='<br>你购买了'+choice[item_num].name;
            money-=choice[item_num].price;
            if(choice[item_num].repurchasable){//判断物品是否是可以重复购买的
                eval(choice[item_num].effect_script);
            }
            else{
                if(choice[item_num].resusable){//判断物品是否是可以重复使用的
                    owned_item.push(choice[item_num]);
                    choice.splice(item_num,1);
                }
                else{
                    owned_item.push(choice[item_num]);
                    eval(choice[item_num].effect_script);
                    choice.splice(item_num,1);
                }
            }  
        }
        else warning('源石锭');
        addchoice.innerHTML="";
        rewrite_property();
        rewrite_item();
    }
    for(var n=0;n<choice.length;n++){
        var newbutton = document.createElement("input");
        var brDiv = document.createElement('br');
        newbutton.type = "button";
        newbutton.id = "button"+n;
        if(choice[n]['name']==='离开') newbutton.value = choice[n]['name'];
        else newbutton.value = choice[n]['name']+':'+choice[n]['effect_text']+'(需要'+choice[n]['price']+'源石锭)';
        addchoice.appendChild(newbutton);
        addchoice.appendChild(brDiv);
        if(document.getElementById("button"+n).value==='离开') document.getElementById("button"+n).onclick=Function(choice[n]['script']);
        else document.getElementById("button"+n).onclick=Function(choice[n]['script']+';shop('+n+')');
    }
    return 0;
}
function frostnova(psb){//霜星事件
    if(psb)
    {
        addstory.innerHTML='白兔子在你的梦境中萦绕。在你梦的最后，随着一阵寒风吹过，兔子也消失不见，你从梦中惊醒，但你始终想不起来她是谁......';
        choice=[{text:"可是为什么，你的眼角上挂着泪？（生命值降为1，记忆+5）",script:"life=1;memory+=5;game_data[game_data.length-1]+='，在梦里你遇见了霜星';"}];
        createbutton(choice);
        p_frost=false;
        frost=true;
        return 0;
    }
    p_frost=false;
    del_choice();
    game();
}
function life0_gameover(){//因生命值为0游戏结束函数
    addstory.innerHTML='随着最后一丝意识从你的身体中抽离，你与这座移动设施融为了一体，除了她之外，不会有人再回忆起你的名字......';
    choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
    createbutton(choice);
    return 0;
}
function memory0_gameover(){//因记忆为0游戏结束函数
    addstory.innerHTML='记忆逐渐淡去，你感觉自己好像忘记了什么重要的东西，但是随后你意识到，你不过是在玩一个游戏罢了';
    choice=[{text:"下一步",script:"addstory.innerHTML='反正只要还有新的游戏，就总能找到新乐子，不是吗？<br>那么接下来，要玩些什么呢？';choice=[{text:\"明日方舟(重新开始)\",script:\"location.reload();return 0;\"},{text:\"明日方舟终末地\",script:\"window.location.href='https://endfield.hypergryph.com';return 0;\"},{text:\"来自星尘(明明是我先来的QAQ)\",script:\"window.location.href='https://www.taptap.com/app/223680';{text:\"查看本局游戏过程\",script:\"del_choice();final_report()\"};return 0;\"}];createbutton(choice);return 0;"}];
    createbutton(choice);
    return 0;
}
function endding(){//结局事件调用函数
    if(memory<40&&frost){
        addstory.innerHTML='低温在整个设施中蔓延，你看到，释放低温的源头，那个白发的卡特斯，正站在你的面前。<br>你不认识她，你只想毁灭她，毁灭让你最重要的人们陷入危险的元凶。<br>你将手轻轻地放上了她的脖子......<br>“是的，很凉......“';
        choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
        game_data.push('她的心脏失去了温度');
        createbutton(choice);
        return 0;
    }
    if(memory>=40&&frost){
        addstory.innerHTML='在一片朦胧的雾气中，一个熟悉的身影浮现出来。<br>虽然眼前的雾气十分冷，但是身体里仿佛有一股力量驱使着你拨开它们向她走去。<br>终于，白发的卡特斯的全貌展现在你的眼前。<br>“霜星！”你的嘴里不自觉地吐出这个名字。<br>白发的卡特斯向你走了过来，递给你几颗糖果，向你微笑了一下。<br>随后，她转过身，决绝地走向了那片雾气中。<br>你循着她的方向想赶上她，然而她已消失于这天地之间......<br>你剥开一颗糖，放入嘴里，熟悉的味道使你眼中淌出了热泪。<br>在这辛辣的气味里，你回忆起了一切。<br>“她，早就已经不在了......”';
        choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
        game_data.push('你的心脏失去了温度');
        createbutton(choice);
        return 0;
    }
    if(memory>=20&&memory<30){
        addstory.innerHTML='你的记忆在逐渐恢复。<br>从仿佛无尽的长梦中醒来后，你发现你躺在你自己办公室的床上，周围的景象是如此熟悉，却又是如此陌生。<br>你想起身来，但是剧烈的头痛使你放弃了这个动作。<br>”你是清醒着，还是仍在梦中？“';
        choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
        game_data.push('故事的最后，一切不过是你的梦罢了');
        createbutton(choice);
        return 0;
    }
    if(memory>=30&&memory<=40){
        addstory.innerHTML='你拖着疲惫的身子不停地在走廊上奔走，沿途的景象使你感到厌倦。<br>突然在前面的走廊上，艾雅法拉的身影浮现。<br>“前辈走了这么久，肯定很累了吧。”她的语气中带着一丝怜爱。<br>困意不断地袭来，你不自觉地向她靠近，终于扑倒在了她柔软的怀中，她也紧紧地抱住了你。<br>“前辈，是我最珍贵的东西呢......”';
        choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
        game_data.push('......吧，和她一起');
        createbutton(choice);
        return 0;
    }
    if(memory>=40){
        addstory.innerHTML='你在无边的噩梦中徘徊许久，但是似乎有一股力量一直在冥冥之中指引着你。<br>当你的意识更加清醒一些后，你感到一股舒缓的压力从胸口传来。<br>你睁开了眼睛，熟悉的栗色秀发首先映入你的眼帘。<br>伴随着不断吹到你脸上的均匀轻柔的呼吸，你回忆起了一切。<br>你伸出一只手，小心地抚摸着胸口上小小的脑袋。<br>“是的，到了该醒来的时候了......”';
        choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
        game_data.push('哪怕您忘记了她，她也从来没有忘记过您');
        createbutton(choice);
        return 0;
    }
    if(node>=50){
        node=114514;
        rewrite_property();
        addstory.innerHTML='5L2g5p2l5Yiw5LqG5LiA5a626Iy26aaG77yM55yL6KeB5qGM5LiK55qE57qi6Iy277yM5L2g6YCJ5oup5LiA6aWu6ICM5bC944CC';
        choice=[{text:"5p+l55yL5pys5bGA5ri45oiP6L+H56iL",script:"del_choice();final_report()"}];
        game_data.push('V2hlcmUgdGhlcmUgaXMgYSB3aWxsLHRoZXJlIGlzIHdheS4=');
        createbutton(choice);
        return 0;
    }
    addstory.innerHTML='你见过一个连结局都没有的游戏吗？假如没有，那你现在见到了';
    choice=[{text:"查看本局游戏过程",script:"del_choice();final_report()"}];
    game_data.push('你来到了事件的结局，一切的终点（这么像样的结局绝壁是真结局好吧）');
    createbutton(choice);
    return 0;
}
function final_report(){//结局结算过程
    addstory.style="display:none";
    addwarning.style="display:none";
    addchoice.style="display:none";
    document.getElementById("restart").style="";
    for(var n=0;n<game_data.length;n++){
        addprocess.innerHTML+=game_data[n]+'<br>';
    }
    return 0;
}