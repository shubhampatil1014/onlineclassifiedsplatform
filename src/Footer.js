function Footer(){
return (<div className="footer" id="footer"><footer>
	<div>
		<div className="head" style={{ textAlign: "center" }}>
  <img src="/images/logo_7.png" width="130" height="85" alt="logo" />
</div>

		<div>
			<p>Subscribe to our newsletter to get updates about our grand offers.</p>
			<div style={{ margin: "0 20px" }}>
				<div className="social-apps">
					<a href="https://www.facebook.com" target="_blank"><img src="/images/fb.png"
							alt="fb" /></a>
				</div>
				<div className="social-apps">
					<a href="https://www.twitter.com" target="_blank"><img src="/images/twitter.png"
							alt="twitter" /></a>
				</div>
				<div className="social-apps">
					<a href="https://www.pinterest.com" target="_blank"><img src="/images/pinterest.png"
							alt="pinterest" width="16" height="16" /></a>
				</div>
				<div className="social-apps">
					<a href="https://www.instagram.com" target="_blank"><img src="/images/insta.png"
							alt="insta" /></a>
				</div>
				<div className="social-apps">
					<a href="https://www.youtube.com" target="_blank"><img src="/images/yt.png"
							alt="youtube" /></a>
				</div>
			</div>
		</div>
	</div>


	<div>
		<div className="head">
			<h2>Quick Links</h2>
		</div>
		<div>
			<ul type="none">
				<li><a href="#">Home</a></li>
				<li><a href="#">About Us</a></li>
				<li><a href="#">Offer</a></li>
				<li><a href="#">Services</a></li>
				<li><a href="#">Contact Us</a></li>
			</ul>
		</div>
	</div>
	<div>
		<div className="head">
			<h2>Help Center</h2>
		</div>
		<div>
			<ul type="none">
				<li><a href="#">FAQs</a></li>
				<li><a href="#">Payments</a></li>
				<li><a href="#">Returns & Refunds</a></li>
				<li><a href="#">Checkout</a></li>
				<li><a href="#">Delivery Information</a></li>
			</ul>
		</div>
	</div>
	<div>
		<div className="head">
			<h2>Our Newsletter</h2>
		</div>
		<div className="body">
			<p>Subscribe to our newsletter to get updates about our grand offers.</p>
			<div>
				<input type="text" name="telegram"/>
				<a href="#"><img id="tele" src="/images/telegram.png" alt="telegram" width="32"
						height="32" /></a>
			</div>
		</div>
	</div>

</footer>
<div className="clear-both"></div></div>);
}
export default Footer;