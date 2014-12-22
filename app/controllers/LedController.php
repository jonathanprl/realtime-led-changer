<?php

class LedController extends \BaseController {

    private $output;
    private $status;

    public function getStatus() 
    {
        SSH::into('pi')->run(
            array(
                'gpio -v'
            ),
            function($line)
            {
                $this->output = $line;
            }
        );

        return Response::json(array('message' => $this->output), 200);
    }

    public function postUpdate() 
    {
        switch(Input::get('action')) {

            case "on":
                $status = 1;
                break;

            case "off":
                $status = 0;
                break;

            default:
                return Response::json(array('message' => 'Invalid action.'), 406);
                break;

        }

        switch(Input::get('colour')) {

            case "red":
                $pin = 1;
                break;

            case "yellow":
                $pin = 0;
                break;

            default:
                return Response::json(array('message' => 'Invalid colour.'), 406);
                break;

        }

        SSH::into('pi')->run(
            array(
                'gpio mode '.$pin.' out',
                'gpio write '.$pin.' '.$status
            ),
            function($line)
            {
                $this->output = $line;
            }
        );

        SSH::into('pi')->run(
            array(
                'gpio read '.$pin
            ),
            function($line)
            {
                $this->status = $line;
            }
        );

        if($this->status != $status)
            return Response::json(array('message' => 'LED did not change.'), 500);

        return Response::json(array('message' => 'LED changed successfully.'), 200);
    }

}
