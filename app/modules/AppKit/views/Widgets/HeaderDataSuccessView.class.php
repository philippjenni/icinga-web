<?php

class AppKit_Widgets_HeaderDataSuccessView extends AppKitBaseView {
	
	public function executeHtml(AgaviRequestDataHolder $rd) {
		
		$this->setupHtml($rd);

		$this->setAttribute('web_path', AgaviConfig::get('org.icinga.appkit.web_path'));

		AppKitEventDispatcher::getInstance()->triggerSimpleEvent(
			'appkit.headerdata.publish',
			'Last change to add some header data',
			$this->getContext()
		);
	}
	
}