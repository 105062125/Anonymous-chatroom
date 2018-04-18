var roomnum = Math.ceil(Math.random()*3);
let chooseroom = [];
var savems ;
var check;
chooseroom[1] = ['/ID1/','/ID1/content/','/ID1/visit'] ;
chooseroom[2] = ['/ID2/','/ID2/content/','/ID2/visit'] ;
chooseroom[3] = ['/ID3/','/ID3/content/','/ID3/visit'] ;
var add;
var refdestination;
firebase.database().ref(chooseroom[roomnum][2]).once('value', function(data) {
  add = data.val();
  var test1 = firebase.database().ref(chooseroom[roomnum][0]);
  test1.update({
  "visit": add+1
  });
});

function logout(){
  firebase.auth().signOut();
  window.location.replace('index.html');
}

function intocreateroom(){
  check = document.getElementById("intocreateroom").value;
  if(check == roomnum)
  {
    window.alert("你已經在此房間");
  }
  else
  {
    roomnum = document.getElementById("intocreateroom").value;
    refdestination = roomnum + '/' + 'content/';
    var $name = $('#name'),
      $content = $('#content'),
      $btn = $('#btn'),
      $show = $('#show');
      var database = firebase.database().ref();
      document.getElementById("user_para2").innerHTML = " [ "+" Room  " + roomnum + " ] ";
      firebase.database().ref(refdestination).once('value', function(snapshot) {
        $show.html('');
        for(var i in snapshot.val()){
           $show.append('<div><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
        }
        $show.scrollTop($show[0].scrollHeight);
      });
      document.getElementById("intocreateroom").value = '';
      firebase.database().ref(refdestination).limitToLast(1).on('value', function(snapshot) {
        for(var i in snapshot.val()){
           $show.append('<div class="'+snapshot.val()[i].id+'"><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
        }
        $show.scrollTop($show[0].scrollHeight);
        $show.find('.id'+savems+' .name').css({
          'float':'right',
          'padding-top':'12px',
          'color':'#fc0'
        });
        $show.find('.id'+savems+' .content').css({
          'float':'right',
          'margin-right':'10px'
        });
        $show.find('.id'+savems+' .time').css({
          'right':'0',
          'color':'#777'
        });
      });
  }
  
}

function createroom(){
  roomnum = document.getElementById("createroom").value;
  loginUser = firebase.auth().currentUser;  
  refdestination = roomnum + '/' + 'content/';
  firebase.database().ref(roomnum).set({
    content : 0,
    visit : 0
  });
  window.alert("已進入密語房間")
  //創完了
  //進入房間
  document.getElementById("createroom").value = '';
  var $name = $('#name'),
      $content = $('#content'),
      $btn = $('#btn'),
      $show = $('#show');

  var database = firebase.database().ref();
document.getElementById("user_para2").innerHTML = " [ "+" Room  " + roomnum + " ] ";

firebase.database().ref(refdestination).once('value', function(snapshot) {
  $show.html('');
  for(var i in snapshot.val()){
     $show.append('<div><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
  }
  $show.scrollTop($show[0].scrollHeight);
});

firebase.database().ref(refdestination).limitToLast(1).on('value', function(snapshot) {
  for(var i in snapshot.val()){
     $show.append('<div class="'+snapshot.val()[i].id+'"><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
  }
  $show.scrollTop($show[0].scrollHeight);
  $show.find('.id'+savems+' .name').css({
    'float':'right',
    'padding-top':'12px',
    'color':'#fc0'
  });
  $show.find('.id'+savems+' .content').css({
    'float':'right',
    'margin-right':'10px'
  });
  $show.find('.id'+savems+' .time').css({
    'right':'0',
    'color':'#777'
  });
});




}



function changeroom(){
  check = document.getElementById("changeroom").value;
  if(check>3 || check <1)
  {
    window.alert("請輸入1~3房");
  }
  else if(roomnum == check)
  {
    window.alert("已在此房間");
  }
  else
  {
    roomnum = document.getElementById("changeroom").value;
    var $name = $('#name'),
    $content = $('#content'),
    $btn = $('#btn'),
    $show = $('#show');
    refdestination = chooseroom[roomnum][1];
var database = firebase.database().ref();
document.getElementById("user_para2").innerHTML = " [ "+" Room  " + roomnum + " ] ";
firebase.database().ref(refdestination).once('value', function(snapshot) {
  $show.html('');
  for(var i in snapshot.val()){
     $show.append('<div><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
  }
  $show.scrollTop($show[0].scrollHeight);
});
firebase.database().ref(refdestination).limitToLast(1).on('value', function(snapshot) {
  for(var i in snapshot.val()){
     $show.append('<div class="'+snapshot.val()[i].id+'"><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
  }
  $show.scrollTop($show[0].scrollHeight);
  $show.find('.id'+savems+' .name').css({
    'float':'right',
    'padding-top':'12px',
    'color':'#fc0'
  });
  $show.find('.id'+savems+' .content').css({
    'float':'right',
    'margin-right':'10px'
  });
  $show.find('.id'+savems+' .time').css({
    'right':'0',
    'color':'#777'
  });
});
  }
    
  

}





$(function(){
  var $name = $('#name'),
      $content = $('#content'),
      $btn = $('#btn'),
      $show = $('#show'),
      ms = new Date().getTime();
  var database = firebase.database().ref();
  savems = ms;
  document.getElementById("user_para2").innerHTML = " [ "+" Room  " + roomnum + " ] ";
  refdestination = chooseroom[roomnum][1];
  $btn.on('click',write);
  $content.on('keydown', function(e){
    if(e.keyCode == 13){
      write();
    }
  });
  
  function write(){
    var user = firebase.auth().currentUser;
    if(user.displayName == null){
      window.alert("請去setting設定名字")
    }
    else{
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      if(h<10){
        h = '0'+h;
      }
      if(m<10){
        m = '0' + m;
      }
      if(s<10){
        s = '0' + s;
      }
      var now = h+':'+m+':'+s;
      var postData = {
        name:user.displayName,
        content:$('#content').val(),
        time:now,
        id:'id'+ms
      };
      firebase.database().ref(refdestination).push(postData);
      $content.val('');
    }
    
    

  }
  
  firebase.database().ref(refdestination).once('value', function(snapshot) {
    $show.html('');
    for(var i in snapshot.val()){
       $show.append('<div><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
    }
    $show.scrollTop($show[0].scrollHeight);
  });

  
  firebase.database().ref(refdestination).limitToLast(1).on('value', function(snapshot) {
    for(var i in snapshot.val()){
       $show.append('<div class="'+snapshot.val()[i].id+'"><div class="time">'+snapshot.val()[i].time+'</div><div class="name">'+snapshot.val()[i].name+' 說</div><div class="content">'+snapshot.val()[i].content+'</div>');
    }
    $show.scrollTop($show[0].scrollHeight);
    $show.find('.id'+ms+' .name').css({
      'float':'right',
      'padding-top':'12px',
      'color':'#fc0'
    });
    $show.find('.id'+ms+' .content').css({
      'float':'right',
      'margin-right':'10px'
    });
    $show.find('.id'+ms+' .time').css({
      'right':'0',
      'color':'#777'
    });
  });
 
  
});
