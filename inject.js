;(function() {
  
  console.log('shortcuts is ready!');
  
  function triggerUndo() {
    document.body.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'z',
      keyCode: 90,
      which: 90,
      ctrlKey: true,
    }));
  }
  
  function backToPreviousMarkerPosition() {
    document.body.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    }));
  }
  
  function startRecording() {
    document.body.dispatchEvent(new KeyboardEvent('keydown', {
      key: ' ',
      keyCode: 32,
      which: 32,
      ctrlKey: true,
    }));
  }
  
  let $ = document.querySelector.bind(document);
  
  function listenForBackslash() {
    
    document.addEventListener('keydown', function(event) {
      if (isInputElement(event.target)) return;
      
      if (event.key === '\\') {
        triggerUndo();
        backToPreviousMarkerPosition();
        startRecording();
      } else if (event.key === '`') {
        triggerUndo();
        backToPreviousMarkerPosition();
      }
    });
    
  }
  
  function listenForFlatIO() {
    
    document.addEventListener('keydown', function(event) {
      
      if (isInputElement(event.target)) return;
        
      if (event.key == '\\') {
        $('[aria-label="MIDI Devices"]').click();
        if (!$('#midi-write-switcher')) return;
        
        $('#midi-write-switcher').click();
        if ($('#midi-write-switcher').checked) {
          $('[aria-label="MIDI Devices"]').style.opacity = 1;
        } else {
          $('[aria-label="MIDI Devices"]').style.opacity = 0.3;
        }
      } else if (event.key == '`') {
        $('[aria-label="Volume"]').click();
        if (!$('.muted')) return;

        $('.muted').click();
        if ($('.muted').classList.contains('active')) {
          $('[aria-label="Volume"]').style.opacity = 1;
        } else {
          $('[aria-label="Volume"]').style.opacity = 0.3;
        }
      }
      
    });
    
  }
  
  function isInputElement(element) {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
  }
  
  if (location.href.includes('flat.io')) {
    listenForFlatIO();
  } else {
    listenForBackslash();
  }

})();
