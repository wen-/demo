var NowImg = 1;
var bStart = 0;
var bStop =0;

function fnToggle() 
{
	var next = NowImg + 1;

	if(next == MaxImg+1) 
	{
		NowImg = MaxImg;
		next = 1;
	}
	if(bStop!=1)
	{

		if(bStart == 0)
		{
			bStart = 1;		
			setTimeout('fnToggle()', 4000);
			return;
		}
		else
		{
			loupan1.filters[0].Apply();

			document.images['tu'+next].style.display = "";
			document.images['tu'+NowImg].style.display = "none"; 

			loupan1.filters[0].Play(duration=2);

			if(NowImg == MaxImg) 
				NowImg = 1;
			else
				NowImg++;
		}
		setTimeout('fnToggle()', 4000);
	}
}


function toggleTo(img)
{
	bStop=1;
	if(img==1)
	{
			document.images['tu1'].style.display = "";
			document.images['tu2'].style.display = "none"; 
			document.images['tu3'].style.display = "none"; 
			document.images['tu4'].style.display = "none"; 
	}
	else if(img==2)
	{
			document.images['tu2'].style.display = "";
			document.images['tu1'].style.display = "none"; 
			document.images['tu3'].style.display = "none"; 
			document.images['tu4'].style.display = "none"; 
	}
	else if(img==3)
	{
			document.images['tu3'].style.display = "";
			document.images['tu1'].style.display = "none"; 
			document.images['tu2'].style.display = "none"; 
			document.images['tu4'].style.display = "none"; 
	}
	else if(img==4)
	{
			document.images['tu4'].style.display = "";
			document.images['tu1'].style.display = "none"; 
			document.images['tu2'].style.display = "none"; 
			document.images['tu3'].style.display = "none"; 
	}

}