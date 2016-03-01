<?php
/**
 * @deprecated use Mage::helper('rainbowsettings') instead
 * @methods:
 * - get[Section]_[ConfigName]($defaultValue = '')
 */
class Gala_Rainbowsettings_Rainbowsettings
{
	public function __call($name, $args) {
		if (method_exists($this, $name))
			call_user_func_array(array($this, $name), $args);
		elseif (preg_match('/^get([^_][a-zA-Z0-9_]+)$/', $name, $m)) {
			$segs = explode('_', $m[1]);
			foreach ($segs as $i => $seg){
				//$segs[$i] = strtolower(preg_replace('/([^A-Z])([A-Z])/', '$1_$2', $seg));
				$seg = preg_replace('/([^A-Z])([A-Z])/', '$1_$2', $seg);
				$seg = preg_replace('/([A-Z])([A-Z])/', '$1_$2', $seg);
				$segs[$i] = strtolower(preg_replace('/([A-Z])([A-Z])/', '$1_$2', $seg));
			}
			$value = Mage::getStoreConfig('galarainbow/'.implode('/', $segs));
			if (!$value) $value = @$args[0];
			return $value;
		}
		
		else 
			call_user_func_array(array($this, $name), $args);
	}

	/**
	 * @return array
	 */
	public function getAllCssConfig() {
		$page_bg_image = Mage::getStoreConfig('galarainbow/general/page_bg_file') ? 
			'url(' . Mage::getBaseUrl('media') . 'background/' . Mage::getStoreConfig('galarainbow/general/page_bg_file') . ')'
			: (Mage::getStoreConfig('galarainbow/general/page_bg_image') ? 'url(../images/stripes/'.Mage::getStoreConfig('galarainbow/general/page_bg_image').')' : '');

		$h_bg_image = Mage::getStoreConfig('galarainbow/header/h_bg_file') ? 
			'url(' . Mage::getBaseUrl('media') . 'background/' . Mage::getStoreConfig('galarainbow/header/h_bg_file') . ')'
			: (Mage::getStoreConfig('galarainbow/header/h_bg_image') ? 'url(../images/stripes/'.Mage::getStoreConfig('galarainbow/header/h_bg_image').')' : '');

		$bd_bg_image = Mage::getStoreConfig('galarainbow/body/bd_bg_file') ? 
			'url(' . Mage::getBaseUrl('media') . 'background/' . Mage::getStoreConfig('galarainbow/body/bd_bg_file') . ')'
			: (Mage::getStoreConfig('galarainbow/body/bd_bg_image') ? 'url(../images/stripes/'.Mage::getStoreConfig('galarainbow/body/bd_bg_image').')' : '');

		$f_bg_image = Mage::getStoreConfig('galarainbow/footer/f_bg_file') ? 
			'url(' . Mage::getBaseUrl('media') . 'background/' . Mage::getStoreConfig('galarainbow/footer/f_bg_file') . ')'
			: (Mage::getStoreConfig('galarainbow/footer/f_bg_image') ? 'url(../images/stripes/'.Mage::getStoreConfig('galarainbow/footer/f_bg_image').')' : '');

		// menu font and dropdown menu font
		if(Mage::getStoreConfig('galarainbow/menu/tm_font') == "")	$tm_font	=	Mage::getStoreConfig('galarainbow/typography/h5_font');
		else	$tm_font	=	Mage::getStoreConfig('galarainbow/menu/tm_font');

		if(Mage::getStoreConfig('galarainbow/menu/dm_font') == "")	$dm_font	=	Mage::getStoreConfig('galarainbow/typography/general_font');
		else	$dm_font	=	Mage::getStoreConfig('galarainbow/menu/dm_font');

		return array(

		/*******	General		*******/
			'p_bg_color' => Mage::getStoreConfig('galarainbow/general/p_bg_color'),
            'page_bg_image' => $page_bg_image,
            'page_bg_position' => Mage::getStoreConfig('galarainbow/general/page_bg_position'),
			'page_bg_repeat' => Mage::getStoreConfig('galarainbow/general/page_bg_repeat'),

		/*******	typography		*******/
			'general_font' => Mage::getStoreConfig('galarainbow/typography/general_font'),
			'h1_font' => Mage::getStoreConfig('galarainbow/typography/h1_font'),
			'h2_font' => Mage::getStoreConfig('galarainbow/typography/h2_font'),
			'h3_font' => Mage::getStoreConfig('galarainbow/typography/h3_font'),
			'h4_font' => Mage::getStoreConfig('galarainbow/typography/h4_font'),
			'h5_font' => Mage::getStoreConfig('galarainbow/typography/h5_font'),
			'h6_font' => Mage::getStoreConfig('galarainbow/typography/h6_font'),
			'additional_css_file' => Mage::getStoreConfig('galarainbow/typography/additional_css_file'),
			'custom_css' => Mage::getStoreConfig('galarainbow/typography/custom_css'),

		/*******	Header		*******/
			'h_text_color' => Mage::getStoreConfig('galarainbow/header/h_text_color'),
			'h_text2_color' => Mage::getStoreConfig('galarainbow/header/h_text2_color'),
			'h_text3_color' => Mage::getStoreConfig('galarainbow/header/h_text3_color'),
			'h_text4_color' => Mage::getStoreConfig('galarainbow/header/h_text4_color'),
			'h_text5_color' => Mage::getStoreConfig('galarainbow/header/h_text5_color'),
			'h_line_color' => Mage::getStoreConfig('galarainbow/header/h_line_color'),
			'h_line2_color' => Mage::getStoreConfig('galarainbow/header/h_line2_color'),
			'h_line3_color' => Mage::getStoreConfig('galarainbow/header/h_line3_color'),
			'h_bg_color' => Mage::getStoreConfig('galarainbow/header/h_bg_color'),
			'h_bg2_color' => Mage::getStoreConfig('galarainbow/header/h_bg2_color'),
			'h_bg3_color' => Mage::getStoreConfig('galarainbow/header/h_bg3_color'),
			'h_bg4_color' => Mage::getStoreConfig('galarainbow/header/h_bg4_color'),
			'h_bg_image' => $h_bg_image,
			'h_bg_position' => Mage::getStoreConfig('galarainbow/header/h_bg_position'),
			'h_bg_repeat' => Mage::getStoreConfig('galarainbow/header/h_bg_repeat'),

		/*******	Main Menu		*******/
			'tm_bg_color' => Mage::getStoreConfig('galarainbow/menu/tm_bg_color'),				// Root menu
			'tm_hover_bg_color' => Mage::getStoreConfig('galarainbow/menu/tm_hover_bg_color'),
			'tm_text_color' => Mage::getStoreConfig('galarainbow/menu/tm_text_color'),
			'tm_hover_text_color' => Mage::getStoreConfig('galarainbow/menu/tm_hover_text_color'),
			'tm_line_color' => Mage::getStoreConfig('galarainbow/menu/tm_line_color'),
			'tm_line2_color' => Mage::getStoreConfig('galarainbow/menu/tm_line2_color'),
			'tm_font' => $tm_font,

			'dm_bg_color' => Mage::getStoreConfig('galarainbow/menu/dm_bg_color'),				// drop menu
			'dm_text_color' => Mage::getStoreConfig('galarainbow/menu/dm_text_color'),
			'dm_text2_color' => Mage::getStoreConfig('galarainbow/menu/dm_text2_color'),
			'dm_text3_color' => Mage::getStoreConfig('galarainbow/menu/dm_text3_color'),
			'dm_font' => $dm_font,

		/*******	Body		*******/
			'bd_bg_color' => Mage::getStoreConfig('galarainbow/body/bd_bg_color'),
			'bd_bg_image' => $bd_bg_image,
			'bd_bg_position' => Mage::getStoreConfig('galarainbow/body/bd_bg_position'),
			'bd_bg_repeat' => Mage::getStoreConfig('galarainbow/body/bd_bg_repeat'),
			'bd_bg2_color' => Mage::getStoreConfig('galarainbow/body/bd_bg2_color'),
			'bd_bg3_color' => Mage::getStoreConfig('galarainbow/body/bd_bg3_color'),
			'bd_bg4_color' => Mage::getStoreConfig('galarainbow/body/bd_bg4_color'),
			'bd_bg5_color' => Mage::getStoreConfig('galarainbow/body/bd_bg5_color'),
			'bd_text_color' => Mage::getStoreConfig('galarainbow/body/bd_text_color'),
			'bd_text2_color' => Mage::getStoreConfig('galarainbow/body/bd_text2_color'),
			'bd_text3_color' => Mage::getStoreConfig('galarainbow/body/bd_text3_color'),
			'bd_text4_color' => Mage::getStoreConfig('galarainbow/body/bd_text4_color'),
			'bd_text5_color' => Mage::getStoreConfig('galarainbow/body/bd_text5_color'),
			'bd_text6_color' => Mage::getStoreConfig('galarainbow/body/bd_text6_color'),
			'bd_text7_color' => Mage::getStoreConfig('galarainbow/body/bd_text7_color'),
			'bd_text8_color' => Mage::getStoreConfig('galarainbow/body/bd_text8_color'),
			'bd_line_color' => Mage::getStoreConfig('galarainbow/body/bd_line_color'),
			'bd_line2_color' => Mage::getStoreConfig('galarainbow/body/bd_line2_color'),
			'bd_line3_color' => Mage::getStoreConfig('galarainbow/body/bd_line3_color'),
			'bd_line4_color' => Mage::getStoreConfig('galarainbow/body/bd_line4_color'),
			'bd_box_shadow' => Mage::getStoreConfig('galarainbow/body/bd_box_shadow'),
			'bd_rounded_corner' => Mage::getStoreConfig('galarainbow/body/bd_rounded_corner'),

		/*******	Footer		*******/
			'f_bg_color' => Mage::getStoreConfig('galarainbow/footer/f_bg_color'),
			'f_bg_image' => $f_bg_image,
			'f_bg_position' => Mage::getStoreConfig('galarainbow/footer/f_bg_position'),
			'f_bg_repeat' => Mage::getStoreConfig('galarainbow/footer/f_bg_repeat'),
			'f_bg2_color' => Mage::getStoreConfig('galarainbow/footer/f_bg2_color'),
			'f_text_color' => Mage::getStoreConfig('galarainbow/footer/f_text_color'),
			'f_text2_color' => Mage::getStoreConfig('galarainbow/footer/f_text2_color'),
			'f_text3_color' => Mage::getStoreConfig('galarainbow/footer/f_text3_color'),
			'f_text4_color' => Mage::getStoreConfig('galarainbow/footer/f_text4_color'),
			'f_line_color' => Mage::getStoreConfig('galarainbow/footer/f_line_color'),
			'f_line2_color' => Mage::getStoreConfig('galarainbow/footer/f_line2_color'),

		/*******	Button		*******/
			'btn1_bg_color' => Mage::getStoreConfig('galarainbow/button/btn1_bg_color'),
			'btn1_text_color' => Mage::getStoreConfig('galarainbow/button/btn1_text_color'),
			'btn1_line_color' => Mage::getStoreConfig('galarainbow/button/btn1_line_color'),
			'btn1_line2_color' => Mage::getStoreConfig('galarainbow/button/btn1_line2_color'),
			'btn1_line3_color' => Mage::getStoreConfig('galarainbow/button/btn1_line3_color'),
			'btn1_font' => Mage::getStoreConfig('galarainbow/button/btn1_font'),
			'btn2_bg_color' => Mage::getStoreConfig('galarainbow/button/btn2_bg_color'),
			'btn2_text_color' => Mage::getStoreConfig('galarainbow/button/btn2_text_color'),
			'btn2_line_color' => Mage::getStoreConfig('galarainbow/button/btn2_line_color'),
			'btn2_font' => Mage::getStoreConfig('galarainbow/button/btn2_font'),
			'btn3_bg_color' => Mage::getStoreConfig('galarainbow/button/btn3_bg_color'),
			'btn3_text_color' => Mage::getStoreConfig('galarainbow/button/btn3_text_color'),
			'btn3_line_color' => Mage::getStoreConfig('galarainbow/button/btn3_line_color'),
			'btn3_font' => Mage::getStoreConfig('galarainbow/button/btn3_font'),
		);
	} 
}